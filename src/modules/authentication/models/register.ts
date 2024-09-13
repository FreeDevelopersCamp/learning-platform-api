import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Address } from 'src/utils/entities/Address';
import { Contact } from 'src/utils/entities/contact';
import { Person } from 'src/utils/entities/person';

export class Register {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Length(8, 16)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  @ApiProperty({ default: '', required: true, maxLength: 16 })
  password: string;

  @AutoMap()
  @ApiProperty({ maxLength: 20, required: true, default: [] })
  roles: number[];

  @IsObject()
  @AutoMap()
  @ApiProperty({ required: true, default: Person })
  personalInformation: Person;

  @IsObject()
  @AutoMap()
  @ApiProperty({ required: true, default: Contact })
  contacts: Contact;

  @IsObject()
  @AutoMap()
  @ApiProperty({ required: true, default: Address })
  address: Address;
}
