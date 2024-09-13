import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Setting extends BaseEntity {
  @AutoMap()
  @IsString()
  @Prop({ required: true, unique: true })
  key: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  value: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
