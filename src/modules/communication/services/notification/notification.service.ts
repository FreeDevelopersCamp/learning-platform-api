import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/Infra/database/repository/mongo-repository';
import { IMongoRepository } from 'src/infra/database/repository/adapter';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Notification } from '../../entity/notification/notification.schema';
import { ResourceNotificationDto } from '../../dto/notification/resource.notification';
import { CreateNotificationDto } from '../../dto/notification/create.notification';
import { UpdateNotificationDto } from '../../dto/notification/update.notification';

@Injectable()
export class NotificationService {
  private readonly _repo: IMongoRepository<Notification>;

  constructor(
    @Inject('NOTIFICATION_MODEL')
    private _notificationModel: Model<Notification>,
    @InjectMapper() private readonly _mapper: Mapper,
  ) {
    this._repo = new MongoRepository<Notification>(_notificationModel);
  }

  async list(): Promise<ResourceNotificationDto[]> {
    return this._mapper.mapArray(
      await this._repo.findAll(),
      Notification,
      ResourceNotificationDto,
    );
  }

  async getById(id: string): Promise<ResourceNotificationDto> {
    return this._mapper.map(
      await this._repo.findOne(id),
      Notification,
      ResourceNotificationDto,
    );
  }

  async create(dto: CreateNotificationDto): Promise<ResourceNotificationDto> {
    return this._mapper.map(
      await this._repo.create(new this._notificationModel(dto)),
      Notification,
      ResourceNotificationDto,
    );
  }

  async update(dto: UpdateNotificationDto): Promise<ResourceNotificationDto> {
    return this._mapper.map(
      await this._repo.update(new this._notificationModel(dto)),
      Notification,
      ResourceNotificationDto,
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }
}
