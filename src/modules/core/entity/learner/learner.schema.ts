import { AutoMap } from '@automapper/classes';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Learner extends BaseEntity {
  @AutoMap()
  userId: Types.ObjectId;

  @AutoMap()
  progress: string;
}

export const LearnerSchema = SchemaFactory.createForClass(Learner);
