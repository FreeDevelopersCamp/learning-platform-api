import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Learner extends BaseEntity {
  @AutoMap()
  @Prop()
  status: string; // from lookup

  @AutoMap()
  @Prop()
  userId: string;

  @AutoMap()
  @Prop()
  progress: string;
}

export const LearnerSchema = SchemaFactory.createForClass(Learner);
