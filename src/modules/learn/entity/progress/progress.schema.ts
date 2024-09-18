import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Progress extends BaseEntity {}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
