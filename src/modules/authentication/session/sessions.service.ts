import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IMongoRepository } from 'src/Infra/database/repository/adapter';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { DeviceInfo, UserRequested } from 'src/infra/system/system.constant';
import { DeviceInformation, Session, SessionParams } from './session';
import { SessionStatus } from '../models/enum/session.status';
import { SettingService } from 'src/modules/core/services/setting/setting.service';
import { SystemSettings } from 'src/modules/core/entity/setting/enum/setting.enum';

@Injectable()
export class SessionService {
  private _sessionRepo: IMongoRepository<Session>;

  constructor(
    @Inject('SESSION_MODEL')
    private _sessionModel: Model<Session>,
    private _settingService: SettingService,
  ) {
    this._sessionRepo = new MongoRepository(_sessionModel);
  }

  async get(): Promise<Session> {
    return (await this._sessionRepo.findAll()).find(
      (a) => a.username === UserRequested.username,
    );
  }

  async set(params: SessionParams): Promise<Session> {
    const sessionProps = await this.setSessionProperties(params);
    const session = await this.get();

    if (session) {
      sessionProps._id = session._id;
      return this.updateLoginAttempt(sessionProps);
    } else {
      return this.addLoginAttempt(sessionProps);
    }
  }

  async setSessionProperties(params: SessionParams): Promise<Session> {
    const session = new Session();
    session.username = params.username;
    session.role = params.role;
    session.password = params.password;
    session.status = params.status;
    if (params.status == SessionStatus.active) {
      session.attempts = 1;
    } else {
      session.attempts = Number(await this.getLoginAttempts()) + 1;
    }
    session.token = params.token;
    session.active = params.active;
    session.deviceInformation = new DeviceInformation();
    session.deviceInformation.ip = DeviceInfo.ip;
    session.deviceInformation.name = DeviceInfo.deviceName;
    session.deviceInformation.browser = DeviceInfo.ip;

    return session;
  }

  async addLoginAttempt(params: Session): Promise<Session> {
    return await this._sessionRepo.create(new this._sessionModel(params));
  }

  async updateLoginAttempt(params: Session): Promise<Session> {
    return await this._sessionRepo.update(new this._sessionModel(params));
  }

  async getLoginAttempts(): Promise<number> {
    const session = await this.get();
    return session ? session.attempts : 0;
  }

  async isReachMaxAttempts(): Promise<boolean> {
    try {
      const maxLoginAttemptsSetting = await this._settingService.getByKey(
        SystemSettings.maxLoginAttempts,
      );

      if (
        !maxLoginAttemptsSetting ||
        typeof maxLoginAttemptsSetting.value === 'undefined'
      ) {
        return false;
      }

      const maxLoginAttempts = Number(maxLoginAttemptsSetting.value);
      const currentAttempts = await this.getLoginAttempts();

      return currentAttempts >= maxLoginAttempts;
    } catch (error) {
      throw new Error('Failed to check max login attempts');
    }
  }

  async checkIfCanRetry(): Promise<boolean> {
    const session = await this.get();
    const retryLoginAfterMinutes = Number(
      (
        await this._settingService.getByKey(
          SystemSettings.retryLoginAfterMinutes,
        )
      ).value,
    );

    if (session) {
      const now = new Date();
      const sessionUpdatedAt = new Date(session.updated.at);

      if (isNaN(retryLoginAfterMinutes)) {
        throw new Error('Invalid retryLoginAfterMinutes value');
      }

      return (
        now.getTime() - sessionUpdatedAt.getTime() >=
        retryLoginAfterMinutes * 60000
      );
    }

    return false;
  }

  async refreshToken(token: string): Promise<string> {
    const session = await this.get();

    if (!session) {
      return '';
    }

    session.token = token;
    session.active = true;
    session.status = SessionStatus.active;

    return (await this._sessionRepo.update(session)).token;
  }

  async killSession(): Promise<boolean> {
    const session = await this.get();
    session.active = false;
    session.status = SessionStatus.inactive;

    if (await this.updateLoginAttempt(session)) {
      return true;
    }

    return false;
  }

  async checkToken(token: string): Promise<boolean> {
    const session = await this.get();

    return session.token === token && session.active;
  }
}
