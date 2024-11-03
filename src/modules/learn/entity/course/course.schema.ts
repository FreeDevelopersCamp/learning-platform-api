import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

export class CourseResource {
  @AutoMap()
  @IsString()
  @Prop({ required: true, unique: true })
  name: string;

  @AutoMap()
  @Prop({ required: false })
  id?: string;

  @AutoMap()
  @Prop({ required: false })
  url?: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  type: string; // article video ...

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  tag: string; // free or paid resource
}

@Schema({ autoCreate: false })
export class Course extends BaseEntity {
  @AutoMap()
  @IsString()
  @Prop({ required: true, unique: true })
  name: string;

  @AutoMap()
  @Prop({ required: true })
  instructorId: Types.ObjectId;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  description: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  category: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  topic: string;

  @AutoMap()
  @Prop({ required: false, default: '0' })
  status: string; // from lookup

  @AutoMap()
  @Prop({ required: true, default: 0 })
  @IsNumber()
  duration: number; // In Minutes

  @AutoMap()
  @IsNumber()
  @Prop({ required: true })
  xp: number; // 2000 == 1 hour

  @AutoMap()
  @Prop({ required: false, type: [CourseResource], default: [] })
  resources?: CourseResource[];

  @AutoMap()
  @Prop({ required: false, default: [] })
  tips?: string[];

  @AutoMap()
  @Prop({ required: false, isArray: true })
  subCoursesIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  parentId?: Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
