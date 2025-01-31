import { MessageModule } from './controllers/message/message.module';
import { Module } from '@nestjs/common';
import { NotificationModule } from './controllers/notification/notification.module';

@Module({
  imports: [MessageModule, NotificationModule],
})
export class CommunicationModule {}
