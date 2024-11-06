import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/utils/entities/base.entity';
import { Types } from 'mongoose';

export class FrequentlyAskedQuestions {
  @AutoMap()
  question: string;

  @AutoMap()
  answer: string;
}

@Schema({ autoCreate: false })
export class Roadmap extends BaseEntity {
  // should include courses, practices, projects only
  @AutoMap()
  @Prop({ default: '0' })
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
  @Prop({ required: true })
  topic: string; // Python Web Development Machine Learning ....

  @AutoMap()
  @Prop({ required: true })
  tag: string; // official_roadmap AI_generated ....

  @AutoMap()
  @Prop({ required: true })
  category: string; // Design Development Marketing IT and Software Business English ....

  @AutoMap()
  @Prop({ required: true })
  instructorId: Types.ObjectId;

  @AutoMap()
  @Prop({ required: true })
  coursesIds: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  projectsIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  practicesIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false, type: [FrequentlyAskedQuestions], default: [] })
  frequentlyAskedQuestions?: FrequentlyAskedQuestions[];

  @AutoMap()
  @Prop({ required: false })
  relatedRoadmapsIds?: Types.ObjectId[];
}

export const RoadmapSchema = SchemaFactory.createForClass(Roadmap);
