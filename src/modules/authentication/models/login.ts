import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class Login {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @ApiProperty({ required: false, maxLength: 20 })
  userName?: string;

  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 25, required: false })
  email?: string;

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
}
