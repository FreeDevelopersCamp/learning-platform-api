import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ContentManagerDto {
  @AutoMap()
  @ApiProperty({ default: '1' })
  status: string;
}
