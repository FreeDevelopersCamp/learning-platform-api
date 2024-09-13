import { MenuDto } from './menu';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto extends MenuDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
