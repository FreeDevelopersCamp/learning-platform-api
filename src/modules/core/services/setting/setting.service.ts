import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Setting } from '../../entity/setting/setting.schema';
import { ResourceSettingDto } from '../../dto/setting/resource.setting';
import { CreateSettingDto } from '../../dto/setting/create.setting';
import { UpdateSettingDto } from '../../dto/setting/update.setting';
import {
  maxLoginAttempts,
  retryLoginAfterMinutes,
} from 'src/Infra/database/seeders/settings/setting.constant';

@Injectable()
export class SettingService {
  private readonly _repo: IMongoRepository<Setting>;

  constructor(
    @Inject('SETTING_MODEL') private _settingModel: Model<Setting>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Setting>(_settingModel);
  }

  async list(): Promise<ResourceSettingDto[]> {
    return this._mapper.mapArrayAsync(
      await this._repo.findAll(),
      Setting,
      ResourceSettingDto,
    );
  }

  async getById(id: string): Promise<ResourceSettingDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Setting,
      ResourceSettingDto,
    );
  }

  async getByKey(key: string): Promise<ResourceSettingDto> {
    return (await this.list()).find((a) => a.key === key);
  }

  async create(dto: CreateSettingDto): Promise<ResourceSettingDto> {
    return this._mapper.map(
      await this._repo.create(new this._settingModel(dto)),
      Setting,
      ResourceSettingDto,
    );
  }

  async update(dto: UpdateSettingDto): Promise<ResourceSettingDto> {
    return this._mapper.map(
      await this._repo.update(new this._settingModel(dto)),
      Setting,
      ResourceSettingDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }

  async seed(): Promise<boolean> {
    const settings = new Array<Setting>();
    settings.push(maxLoginAttempts);
    settings.push(retryLoginAfterMinutes);

    for (const setting of settings) {
      const isSettingExists = await this.getByKey(setting.key);

      if (!isSettingExists) {
        await this.create(setting);
      }
    }

    return true;
  }
}
