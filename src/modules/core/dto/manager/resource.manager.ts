import { ManagerDto } from './manager';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceManagerDto extends ManagerDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
