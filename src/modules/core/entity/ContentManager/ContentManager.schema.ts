import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class ContentManager extends BaseEntity {
  @AutoMap()
  @Prop()
  status: string; // from lookups

  @AutoMap()
  @Prop()
  userId: string;
}

export const ContentManagerSchema =
  SchemaFactory.createForClass(ContentManager);
