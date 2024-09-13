import { MenuDto } from './menu';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceMenuDto extends MenuDto {
  @AutoMap()
  @ApiProperty({ default: '' })
  _id: string;
}
