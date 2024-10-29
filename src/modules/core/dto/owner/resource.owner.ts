import { OwnerDto } from './owner';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceUserDto } from '../user/resource.user';

export class ResourceOwnerDto extends OwnerDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @ApiProperty()
  @AutoMap()
  user: ResourceUserDto;
}
