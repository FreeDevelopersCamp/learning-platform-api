import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Assignment extends BaseEntity {}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
