import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Address } from 'src/utils/entities/Address';
import { BaseEntity } from 'src/utils/entities/base.entity';
import { Contact } from 'src/utils/entities/contact';
import { Person } from 'src/utils/entities/person';

export class Policy {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Prop({ maxlength: 20, required: true })
  name: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  permissions: string[];
}

@Schema({ autoCreate: false })
export class User extends BaseEntity {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Prop({ maxlength: 20, required: true, unique: true })
  userName: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  password: string;

  @AutoMap()
  @Prop({ required: true })
  roles: string[];

  @AutoMap()
  @ValidateNested()
  @Prop({ required: false, type: Policy })
  policies?: Policy[];

  @IsObject()
  @AutoMap()
  @Prop({ type: Person, required: true })
  personalInformation: Person;

  @IsObject()
  @AutoMap()
  @Prop({ type: Contact, required: false })
  contacts: Contact;

  @IsObject()
  @AutoMap()
  @Prop({ type: Address, required: false })
  address: Address;

  @AutoMap()
  @Prop({ required: false })
  image?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
