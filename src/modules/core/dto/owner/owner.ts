import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class OwnerDto {
  @AutoMap()
  @ApiProperty({ default: '1' })
  status: string;
}
