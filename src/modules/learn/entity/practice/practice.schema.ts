import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray } from 'class-validator';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

export class Challenge {
  @AutoMap()
  description: string;

  @AutoMap()
  example?: string;

  @AutoMap()
  xp: number;

  @AutoMap()
  expectedOutput?: string;
}

@Schema({ autoCreate: false })
export class Practice extends BaseEntity {
  @AutoMap()
  @Prop({ required: true })
  name: string;

  @AutoMap()
  @Prop({ required: true })
  instructorId: Types.ObjectId;

  @AutoMap()
  @Prop({ required: false, default: '0' })
  status: string; // lookup

  @AutoMap()
  @Prop({ required: true })
  @IsArray()
  prerequisites: string[];

  @AutoMap()
  @Prop({ required: true })
  category: string; // lookup

  @AutoMap()
  @Prop({ required: true })
  topic: string; // lookup

  @AutoMap()
  @Prop({ required: true })
  xp: number; // 2000 == 1 hour

  @AutoMap()
  @Prop({ required: true, default: 0 })
  duration: number; // minutes

  @AutoMap()
  @Prop({ required: false, default: 0 })
  participants?: number;

  @AutoMap()
  @Prop({ required: true })
  challengesToPass: number;

  @AutoMap()
  @Prop({ required: true, isArray: true, default: [] })
  challenges: Challenge[];
}

export const PracticeSchema = SchemaFactory.createForClass(Practice);
