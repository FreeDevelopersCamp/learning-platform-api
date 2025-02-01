import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Notification extends BaseEntity {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: false })
  status: string; // 0 not seen, 1 seen
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
