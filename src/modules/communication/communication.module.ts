import { Module } from '@nestjs/common';
import { NotificationModule } from './controllers/notification/notification.module';

@Module({
  imports: [NotificationModule],
})
export class CommunicationModule {}
