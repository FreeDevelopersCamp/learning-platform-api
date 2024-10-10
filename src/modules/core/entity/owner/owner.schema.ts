import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Owner extends BaseEntity {
  @AutoMap()
  @Prop({ default: '1' })
  status: string; // from lookup

  @AutoMap()
  @Prop()
  userId: string;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
