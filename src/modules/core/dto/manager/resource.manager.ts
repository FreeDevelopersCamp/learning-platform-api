import { ManagerDto } from './manager';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceUserDto } from '../user/resource.user';

export class ResourceManagerDto extends ManagerDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty()
  status: string; // from lookup

  @AutoMap()
  @ApiProperty()
  user: ResourceUserDto;
}
