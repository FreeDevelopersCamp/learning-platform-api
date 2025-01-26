import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Message extends BaseEntity {
  @AutoMap()
  @Prop({ required: true })
  senderId: String;

  @AutoMap()
  @Prop({ required: true })
  receiverId: String;

  @AutoMap()
  @Prop({ required: true })
  content: String;

  @AutoMap()
  @Prop({ required: true })
  timestamp: Date;

  @AutoMap()
  @Prop({ required: true, default: false })
  seen: Boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
