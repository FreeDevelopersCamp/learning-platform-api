import { LookupDto } from './lookup';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceLookupDto extends LookupDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
