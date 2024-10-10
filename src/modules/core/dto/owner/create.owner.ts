import { ApiProperty } from '@nestjs/swagger';
import { OwnerDto } from './owner';
import { AutoMap } from '@automapper/classes';

export class CreateOwnerDto extends OwnerDto {
  @AutoMap()
  @ApiProperty()
  userId: string;
}
