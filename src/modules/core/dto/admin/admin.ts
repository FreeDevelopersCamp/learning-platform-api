import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class AdminDto {
  @AutoMap()
  @ApiProperty({ default: '1' })
  status: string;
}
