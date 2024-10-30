import { AutoMap } from '@automapper/classes';
import { AdminDto } from './admin';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto extends AdminDto {
  @AutoMap()
  @ApiProperty()
  userId: string;
}
