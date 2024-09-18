import { ProgressDto } from './progress';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceProgressDto extends ProgressDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
