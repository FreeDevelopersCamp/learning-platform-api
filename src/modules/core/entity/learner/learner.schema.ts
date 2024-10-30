import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Learner extends BaseEntity {
  @AutoMap()
  @Prop({ default: '2' })
  status: string; // from lookup

  @AutoMap()
  @Prop()
  userId: Types.ObjectId;

  @AutoMap()
  @Prop()
  progress: string;
}

export const LearnerSchema = SchemaFactory.createForClass(Learner);
