import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Notification extends BaseEntity {}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
