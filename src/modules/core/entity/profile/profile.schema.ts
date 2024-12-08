import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

export class Work {
  @AutoMap()
  @Prop({ default: '' })
  subtitle: string;

  @AutoMap()
  @Prop({ default: [] })
  works: { description: string; name: string; skills: string[] }[];
}

export class Certification {
  @AutoMap()
  @Prop()
  subtitle: string;

  @AutoMap()
  @Prop()
  certificationsIds: Types.ObjectId[];
}

export class Completed {
  @AutoMap()
  @Prop()
  completedCoursesIds: Types.ObjectId[];

  @AutoMap()
  @Prop()
  completedProjectsIds: Types.ObjectId[];

  @AutoMap()
  @Prop()
  completedRoadmapsIds: Types.ObjectId[];
}

export class CompletedContent {
  @AutoMap()
  @Prop()
  subtitle: string;

  @AutoMap()
  @Prop()
  completed: Completed;
}

export class ExperienceItem {
  @AutoMap()
  @Prop()
  company: string;

  @AutoMap()
  @Prop()
  startDate: string;

  @AutoMap()
  @Prop()
  endDate: string;

  @AutoMap()
  @Prop()
  description: string;

  @AutoMap()
  @Prop()
  name: string;
}

export class Experience {
  @AutoMap()
  @Prop()
  subtitle: string;

  @AutoMap()
  @Prop()
  experiences: ExperienceItem[];
}

export class EducationItem {
  @AutoMap()
  @Prop()
  name: string;

  @AutoMap()
  @Prop()
  school: string;

  @AutoMap()
  @Prop()
  startDate: string;

  @AutoMap()
  @Prop()
  endDate: string;
}

export class Education {
  @AutoMap()
  @Prop()
  subtitle: string;

  @AutoMap()
  @Prop()
  educations: EducationItem[];
}

@Schema({ autoCreate: false })
export class Profile extends BaseEntity {
  @AutoMap()
  @Prop({ unique: true })
  userId: Types.ObjectId;

  @AutoMap()
  @Prop({ required: false, default: '' })
  position?: string; // NNU

  @AutoMap()
  @Prop({ required: false, default: '' })
  state?: string;

  @AutoMap()
  @Prop({ required: false, default: '' })
  headline?: string;

  @AutoMap()
  @Prop({ required: false })
  accounts?: { name: string; url: string }[];

  @AutoMap()
  @Prop({ required: false, default: '' })
  about?: string;

  @AutoMap()
  @Prop({ required: false })
  work?: Work;

  @AutoMap()
  @Prop({ required: false })
  certifications?: Certification;

  @AutoMap()
  @Prop({ required: false })
  completedContent?: CompletedContent;

  @AutoMap()
  @Prop({ required: false })
  experience?: Experience;

  @AutoMap()
  @Prop({ required: false })
  education?: Education;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
