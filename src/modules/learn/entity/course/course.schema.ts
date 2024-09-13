import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Course extends BaseEntity {}

export const CourseSchema = SchemaFactory.createForClass(Course);
