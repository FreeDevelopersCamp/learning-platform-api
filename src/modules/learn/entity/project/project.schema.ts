import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

export class Hint {
  @AutoMap()
  @Prop({ required: false })
  description: string;

  @AutoMap()
  @Prop({ required: false })
  url: string;
}

export class Task {
  @AutoMap()
  @Prop({ required: true })
  title: string;

  @AutoMap()
  @Prop({ required: true })
  description: string;

  @AutoMap()
  @Prop({ required: true })
  xp: number;

  @AutoMap()
  @Prop({ required: false })
  hints?: Hint[];

  @AutoMap()
  @Prop({ required: false })
  example?: string;

  @AutoMap()
  @Prop({ required: false })
  solution?: string;

  @AutoMap()
  @Prop({ required: false })
  required: string;
}

@Schema({ autoCreate: false })
export class Project extends BaseEntity {
  @AutoMap()
  @Prop({ required: true })
  name: string;

  @AutoMap()
  @Prop({ required: true })
  title: string;

  @AutoMap()
  @Prop({ required: true })
  description: string;

  @AutoMap()
  @Prop({ required: true })
  prerequisites: string[];

  @AutoMap()
  @Prop({ required: false, default: '0' })
  status: string;

  @AutoMap()
  @Prop({ required: true })
  category: string;

  @AutoMap()
  @Prop({ required: true })
  topic: string;

  @AutoMap()
  @Prop({ required: true })
  xp: number;

  @AutoMap()
  @Prop({ required: true })
  tasks: Task[];

  @AutoMap()
  @Prop({ required: false, default: 0 })
  participants?: number;

  @AutoMap()
  @Prop({ required: true })
  instructorId: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
