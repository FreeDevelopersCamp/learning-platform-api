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
import { NotificationDto } from '../../dto/notification/notification';
const path = require('path');

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
    const entities = await this._repo.findAll();
    return await Promise.all(entities.map((entity) => this.toDto(entity)));
  }

  async getById(id: string): Promise<ResourceNotificationDto> {
    return this.toDto(await this._repo.findOne(id));
  }

  async getUserNotifications(userId: string): Promise<NotificationDto[]> {
    const notifications = await this._notificationModel
      .find({ userId })
      .sort({ status: 1, createdAt: -1 }) // 🔹 Sorts by status (0 first) and newest notifications first
      .exec();

    return notifications.map((notification) => ({
      ...notification.toObject(),
      userId: notification.userId.toString(),
    }));
  }

  async create(dto: CreateNotificationDto): Promise<ResourceNotificationDto> {
    return this.toDto(
      await this._repo.create(new this._notificationModel(dto)),
    );
  }

  async update(dto: UpdateNotificationDto): Promise<ResourceNotificationDto> {
    return this.toDto(
      await this._repo.update(new this._notificationModel(dto)),
    );
  }

  async delete(id: string): Promise<boolean> {
    return await this._repo.delete(id);
  }

  sendNotification = async (token: string, title: string, body: string) => {
    const message = {
      notification: {
        title,
        body,
      },
    };

    try {
      // await admin.messaging().send(message);
      console.log(path.resolve(__dirname, 'serviceAccountKey.json'));
      console.log('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  private toDto(entity: Notification): ResourceNotificationDto {
    let dto = new ResourceNotificationDto();
    dto._id = entity._id.toString();
    dto.message = entity.message;
    dto.status = entity.status;
    dto.userId = entity.userId.toString();
    return dto;
  }
}
