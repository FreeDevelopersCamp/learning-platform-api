import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Progress extends BaseEntity {
  @AutoMap()
  @Prop({ required: false, default: 0 })
  xp: number;

  @AutoMap()
  @Prop({ required: false, default: 0 })
  progress: number;

  @AutoMap()
  @Prop({ required: true })
  userId: string;

  @AutoMap()
  @Prop({ required: false })
  currentRoadmapsIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  currentCoursesIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  currentProjectsIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  completedRoadmapsIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  completedCoursesIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  completedProjectsIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  completedPracticesIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  completedTutorialsIds?: Types.ObjectId[];

  @AutoMap()
  @Prop({ required: false })
  completedCertificatesIds?: Types.ObjectId[];
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
