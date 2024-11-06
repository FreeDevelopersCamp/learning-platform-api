import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Exam extends BaseEntity {}

export const ExamSchema = SchemaFactory.createForClass(Exam);
