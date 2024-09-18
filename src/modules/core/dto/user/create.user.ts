import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { UserDto } from './user';

export class CreateUserDto extends UserDto {
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
