import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

export class CurrentProgress {
  @AutoMap()
  @Prop({ type: Types.ObjectId })
  itemId: Types.ObjectId;

  @AutoMap()
  @Prop({ type: Number })
  progress: Number;
}

export class Bookmarks {
  @AutoMap()
  @Prop({ type: Types.ObjectId })
  itemId: Types.ObjectId;

  @AutoMap()
  @Prop({ type: String })
  type: String;
}

@Schema({ autoCreate: false })
export class Progress extends BaseEntity {
  @AutoMap()
  @Prop({ required: false, default: 0 })
  xp: number;

  @AutoMap()
  @Prop({ required: false, default: 0 })
  spentTime: number;

  @AutoMap()
  @Prop({ required: true, unique: true })
  userId: string;

  @AutoMap()
  @Prop({ required: false, default: [] })
  BookmarksIds?: Bookmarks[];

  @AutoMap()
  @Prop({ required: false, default: [] })
  currentRoadmapsIds?: CurrentProgress[];

  @AutoMap()
  @Prop({ required: false, default: [] })
  currentCoursesIds?: CurrentProgress[];

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
