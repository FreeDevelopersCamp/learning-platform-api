import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from '../../services/notification/notification.service';
import { NotificationModels } from '../../entity/notification/notification.model.provider';
import { NotificationProfile } from '../../entity/notification/notification.mapper';

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationModels.notification,
    NotificationProfile,
  ],
})
export class NotificationModule {}
