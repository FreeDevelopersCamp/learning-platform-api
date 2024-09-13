import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user';

export class UpdateUserDto extends UserDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
