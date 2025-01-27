import { MessageModule } from './controllers/message/message.module';
import { Module } from '@nestjs/common';
import { NotificationModule } from './controllers/notification/notification.module';
import { MessageGateway } from './services/message/message.gateway';

@Module({
  imports: [MessageModule, NotificationModule],
})
export class CommunicationModule {}
