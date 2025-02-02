import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Notification } from './Notification.schema';
import { NotificationDto } from '../../dto/notification/notification';
import { ResourceNotificationDto } from '../../dto/notification/resource.notification';
import { CreateNotificationDto } from '../../dto/notification/create.notification';
import { UpdateNotificationDto } from '../../dto/notification/update.notification';
import { Types } from 'mongoose';

export class NotificationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, NotificationDto, Notification);
      createMap(mapper, Notification, NotificationDto);

      createMap(
        mapper,
        ResourceNotificationDto,
        Notification,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src._id)),
        ),
        forMember(
          (dest) => dest.userId,
          mapFrom((src) => new Types.ObjectId(src.userId)),
        ),

        forMember(
          (dest) => dest.message,
          mapFrom((src) => src.message),
        ),
        forMember(
          (dest) => dest.status,
          mapFrom((src) => src.status),
        ),
      );
      createMap(
        mapper,
        Notification,
        ResourceNotificationDto,
        forMember(
          (dest) => dest._id,
          mapFrom((src) => src._id.toString()),
        ),
        forMember(
          (dest) => dest.userId,
          mapFrom((src) => src.userId.toString()),
        ),
        forMember(
          (dest) => dest.message,
          mapFrom((src) => src.message),
        ),
        forMember(
          (dest) => dest.status,
          mapFrom((src) => src.status),
        ),
      );

      createMap(mapper, ResourceNotificationDto, NotificationDto);
      createMap(mapper, NotificationDto, ResourceNotificationDto);

      createMap(mapper, ResourceNotificationDto, CreateNotificationDto);
      createMap(mapper, CreateNotificationDto, ResourceNotificationDto);

      createMap(mapper, ResourceNotificationDto, UpdateNotificationDto);
      createMap(mapper, UpdateNotificationDto, ResourceNotificationDto);
    };
  }
}
