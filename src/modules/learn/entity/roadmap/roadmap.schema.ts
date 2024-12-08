import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/utils/entities/base.entity';
import { Types } from 'mongoose';

export class FrequentlyAskedQuestions {
  @AutoMap()
  @Prop({ required: true })
  question: string;

  @AutoMap()
  @Prop({ required: false })
  answer?: string;
}

@Schema({ autoCreate: false })
export class Roadmap extends BaseEntity {
  @AutoMap()
  @IsString()
  @Prop({ unique: true, required: true })
  name: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  description: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  tag: string; // official-roadmap AI-generated ....

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  category: string; // Design Development Marketing IT and Software Business English ....

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  topic: string; // Python Web-Development Machine-Learning ....

  @AutoMap()
  @Prop({ required: false, default: '0' })
  status: string; // from lookup

  @AutoMap()
  @Prop({ required: false })
  keywords?: string[]; // from lookup

  @AutoMap()
  @Prop({ required: false })
  prerequisites?: string[];

  @AutoMap()
  @Prop({ required: false, default: 0 })
  participants?: number;

  @AutoMap()
  @Prop({ required: false, default: 0 })
  xp?: number;

  @AutoMap()
  @Prop({ required: false, default: '' })
  rating?: string;

  @AutoMap()
  @Prop({ required: false, default: 0 })
  duration?: number; // minutes

  @AutoMap()
  @Prop({ required: true })
  instructorId: Types.ObjectId;

  @AutoMap()
  @Prop({ required: true })
  coursesIds: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  practicesIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  projectsIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  examId?: Types.ObjectId;

  @AutoMap()
  @Prop({ required: false })
  certificationId?: Types.ObjectId;

  @AutoMap()
  @Prop({ required: true })
  orderIds: string[];

  @AutoMap()
  @Prop({ required: false, type: [FrequentlyAskedQuestions], default: [] })
  frequentlyAskedQuestions?: FrequentlyAskedQuestions[];

  @AutoMap()
  @Prop({ required: false })
  relatedRoadmapsIds?: Types.ObjectId[];
}

export const RoadmapSchema = SchemaFactory.createForClass(Roadmap);
