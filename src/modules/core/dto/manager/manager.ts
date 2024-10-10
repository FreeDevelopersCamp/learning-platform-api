import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceUserDto } from '../user/resource.user';

export class ManagerDto {
  @AutoMap()
  @ApiProperty()
  status: string; // from lookup

  @AutoMap()
  @ApiProperty()
  user: ResourceUserDto;
}
