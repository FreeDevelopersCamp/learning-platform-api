import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsString, IsUrl } from 'class-validator';
import { BaseEntity } from 'src/utils/entities/base.entity';

export class CourseResource {
  @AutoMap()
  @IsString()
  @Prop({ required: true })
  name: string;

  @AutoMap()
  @IsUrl()
  @Prop({ required: true })
  url: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  type: string;
}

@Schema({ autoCreate: false })
export class Course extends BaseEntity {
  @AutoMap()
  @IsString()
  @Prop({ required: true, unique: true })
  name: string;

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
