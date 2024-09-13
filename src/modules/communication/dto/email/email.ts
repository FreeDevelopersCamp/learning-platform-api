import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Email } from '../../entity/email/email.schema';
import { AutoMap } from '@automapper/classes';

export class EmailDto {
  @AutoMap()
  @ApiProperty({ required: true, type: Email, default: '' })
  @IsEmail()
  email: string;

  @AutoMap()
  @ApiProperty({ required: true, type: Email, default: '' })
  @IsEmail()
  to: string;

  @AutoMap()
  @ApiProperty({ required: true, default: '' })
  @IsString()
  subject: string;

  @AutoMap()
  @ApiProperty({ required: true, default: '' })
  @IsString()
  content: string;
}
