import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class AccountManager extends BaseEntity {
  @AutoMap()
  @Prop()
  status: string; // from lookup

  @AutoMap()
  @Prop()
  userId: string;
}

export const AccountManagerSchema =
  SchemaFactory.createForClass(AccountManager);
