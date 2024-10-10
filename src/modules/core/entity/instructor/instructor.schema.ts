import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray } from 'class-validator';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Instructor extends BaseEntity {
  @AutoMap()
  @Prop({ default: '1' })
  status: string; // from lookup

  @Prop({ required: true })
  @AutoMap()
  userId: Types.ObjectId;

  @Prop({ required: false })
  @AutoMap()
  @IsArray()
  courseIds?: Types.ObjectId[];

  @Prop({ required: false })
  @AutoMap()
  @IsArray()
  roadmapIds?: Types.ObjectId[];
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
