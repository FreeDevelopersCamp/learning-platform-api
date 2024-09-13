import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Menu extends BaseEntity {
  @AutoMap()
  @IsString()
  @Prop({ required: true, unique: true })
  name: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  icon: string;

  @AutoMap()
  @IsString()
  @Prop({ required: true })
  url: string;

  @AutoMap()
  @IsNumber()
  @Prop({ required: true })
  order: number;

  @AutoMap()
  @Prop({ required: true })
  roles: string[];

  @AutoMap()
  @Prop({ required: true })
  isActive: boolean;

  @AutoMap()
  @Prop({ required: true })
  subMenu: Menu[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
