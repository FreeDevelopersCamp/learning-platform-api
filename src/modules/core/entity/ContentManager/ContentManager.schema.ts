import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class ContentManager extends BaseEntity {
  @AutoMap()
  @Prop({ default: '1' })
  status: string; // from lookups

  @AutoMap()
  @Prop()
  userId: Types.ObjectId;
}

export const ContentManagerSchema =
  SchemaFactory.createForClass(ContentManager);
