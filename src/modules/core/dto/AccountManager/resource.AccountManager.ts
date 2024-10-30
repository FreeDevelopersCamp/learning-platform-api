import { AccountManagerDto } from './AccountManager';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceUserDto } from '../user/resource.user';

export class ResourceAccountManagerDto extends AccountManagerDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty()
  user: ResourceUserDto;
}
