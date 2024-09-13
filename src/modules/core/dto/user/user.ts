import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Address } from 'src/utils/entities/Address';
import { Contact } from 'src/utils/entities/contact';
import { Person } from 'src/utils/entities/person';

export class PolicyDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 20, required: true })
  name: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  permissions: string[];
}

export class UserDto {
  @AutoMap()
  @ApiProperty({ required: true, default: [] })
  roles: string[];

  @AutoMap()
  @ValidateNested()
  @ApiProperty({ required: false, type: PolicyDto, isArray: true })
  policies?: PolicyDto[];

  @IsObject()
  @AutoMap()
  @ApiProperty({ type: Person, required: true })
  personalInformation: Person;

  @IsObject()
  @AutoMap()
  @ApiProperty({ type: Contact, required: true })
  contacts: Contact;

  @IsObject()
  @AutoMap()
  @ApiProperty({ type: Address, required: true })
  address: Address;

  @AutoMap()
  @ApiProperty({
    required: false,
    type: String,
    default: '',
  })
  image?: string;
}
