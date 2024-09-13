import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsStrongPassword,
} from 'class-validator';

export class ChangePassword {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @ApiProperty({ default: '', required: true, maxLength: 20 })
  userName: string;

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
  oldPassword: string;

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
  newPassword: string;
}
