import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Practice extends BaseEntity {}

export const PracticeSchema = SchemaFactory.createForClass(Practice);
