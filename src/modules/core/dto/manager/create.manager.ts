import { ApiProperty } from '@nestjs/swagger';
import { ManagerDto } from './manager';
import { AutoMap } from '@automapper/classes';

export class CreateManagerDto extends ManagerDto {
  @AutoMap()
  @ApiProperty()
  userId: string;
}
