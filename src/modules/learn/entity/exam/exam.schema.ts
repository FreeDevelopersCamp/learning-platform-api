import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

export class Questions {
  @AutoMap()
  @Prop({ required: true })
  question: string;

  @AutoMap()
  @Prop({ required: true })
  choice1?: string;

  @AutoMap()
  @Prop({ required: true })
  choice2: string;

  @AutoMap()
  @Prop({ required: false })
  choice3?: string;

  @AutoMap()
  @Prop({ required: false })
  choice4?: string;

  @AutoMap()
  @Prop({ required: true })
  correctAnswer: string;
}

@Schema({ autoCreate: false })
export class Exam extends BaseEntity {
  @AutoMap()
  @Prop({ required: true })
  name: string;

  @AutoMap()
  @Prop({ required: false })
  instructorId?: Types.ObjectId;

  @AutoMap()
  @Prop({ required: false })
  roadmapId?: Types.ObjectId;

  @AutoMap()
  @Prop({ required: false, default: '0' })
  status?: string; // lookup

  @AutoMap()
  @Prop({ required: false })
  prerequisites?: string[];

  @AutoMap()
  @Prop({ required: false })
  category?: string; // lookup

  @AutoMap()
  @Prop({ required: false })
  topic?: string; // lookup

  @AutoMap()
  @Prop({ required: false })
  xp?: number; // 2000 == 1 hour

  @AutoMap()
  @Prop({ required: false, default: 0 })
  duration?: number; // minutes

  @AutoMap()
  @Prop({ required: false, default: 0 })
  participants?: number;

  @AutoMap()
  @Prop({ required: false })
  challengesToPass?: number;

  @AutoMap()
  @Prop({ required: false })
  questions?: Questions[];
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
