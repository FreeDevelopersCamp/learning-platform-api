import { AdminDto } from './admin';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto extends AdminDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
