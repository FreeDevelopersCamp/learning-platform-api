import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseEntity } from 'src/utils/entities/base.entity';
import { LookupItem } from './item.lookup';

@Schema({ autoCreate: false })
export class Lookup extends BaseEntity {
  @Prop({ required: true, maxlength: 30, unique: true })
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  name: string;

  @Prop({ required: true })
  @AutoMap()
  @ArrayNotEmpty()
  @ValidateNested()
  items: LookupItem[];

  constructor() {
    super();
  }
}

export const LookupSchema = SchemaFactory.createForClass(Lookup);
