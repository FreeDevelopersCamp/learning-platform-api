import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from '../../services/message/message.service';
import { MessageModels } from '../../entity/message/message.model.provider';
import { MessageProfile } from '../../entity/message/message.mapper';
import { MessageGateway } from '../../services/message/message.gateway';

@Module({
  controllers: [MessageController],
  providers: [
    MessageService,
    MessageModels.message,
    MessageProfile,
    MessageGateway,
  ],
})
export class MessageModule {}
