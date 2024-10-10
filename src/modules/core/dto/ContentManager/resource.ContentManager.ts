import { ContentManagerDto } from './ContentManager';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceContentManagerDto extends ContentManagerDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
