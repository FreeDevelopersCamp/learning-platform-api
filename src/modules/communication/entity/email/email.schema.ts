import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { BaseEntity } from 'src/utils/entities/base.entity';

@Schema({ autoCreate: false })
export class Email extends BaseEntity {
  @AutoMap()
  @Prop({ required: true, type: Email })
  @IsEmail()
  email: string;

  @AutoMap()
  @Prop({ required: true, type: Email })
  @IsEmail()
  to: string;

  @AutoMap()
  @Prop({ required: true })
  @IsString()
  subject: string;

  @AutoMap()
  @Prop({ required: true })
  @IsString()
  content: string;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
