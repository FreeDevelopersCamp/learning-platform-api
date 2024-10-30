import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsString, IsUrl } from 'class-validator';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

export class CourseResource {
  @AutoMap()
  @IsString()
  @Prop({ required: true, unique: true })
  name: string;

  @AutoMap()
  @IsUrl()
  @Prop({ required: true })
  url: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  type: string; // article video ...

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  category: string; // free or paid resource
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
  @IsArray()
  @Prop({ required: true, type: [CourseResource] })
  resources: CourseResource[];

  @AutoMap()
  @IsString()
  @Prop({ required: false })
  tips?: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
