import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsObject, IsString } from 'class-validator';
import { BaseEntity } from 'src/utils/entities/base.entity';
import { Course } from '../course/course.schema';
import { Project } from '../project/project.schema';
import { Assignment } from '../assignment/assignment.schema';

export class FrequentlyAskedQuestions {
  @AutoMap()
  @IsString()
  question: string;

  @AutoMap()
  @IsString()
  answer: string;
}

@Schema({ autoCreate: false })
export class Roadmap extends BaseEntity {
  @AutoMap()
  @Prop({ default: '1' })
  status: string; // from lookup

  @AutoMap()
  @IsString()
  @Prop({ unique: true, required: true })
  name: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  description: string;

  @AutoMap()
  @IsArray()
  @Prop({ required: true, type: String })
  topic: string; // Python Web Development Machine Learning ....

  @AutoMap()
  @Prop({ required: true, type: String })
  tag: string; // official_roadmap AI_generated ....

  @AutoMap()
  @Prop({ required: true, type: String })
  category: string; // Design Development Marketing IT and Software Business English ....

  @AutoMap()
  @IsObject()
  @Prop({ required: true, type: [Course] })
  courses: Course[];

  @AutoMap()
  @IsArray()
  @Prop({ required: false, type: [Project] })
  projects?: Project[];

  @AutoMap()
  @IsArray()
  @Prop({ required: false, type: [Assignment] })
  assignments?: Assignment[];

  @AutoMap()
  @IsArray()
  @Prop({ required: false, type: [FrequentlyAskedQuestions] })
  frequentlyAskedQuestions?: FrequentlyAskedQuestions[];

  // @AutoMap()
  // @IsObject()
  // @Prop({ required: false, type: [Roadmap] })
  // related?: Roadmap[];
}

export const RoadmapSchema = SchemaFactory.createForClass(Roadmap);
