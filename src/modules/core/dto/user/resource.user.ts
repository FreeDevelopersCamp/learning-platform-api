import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResourceUserDto extends UserDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 20, required: true })
  userName: string;

  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}

export class ForAuthUserDto extends UserDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @ApiProperty({ default: '' })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 20, required: true })
  userName: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '', required: true, maxLength: 16 })
  password: string;
}
