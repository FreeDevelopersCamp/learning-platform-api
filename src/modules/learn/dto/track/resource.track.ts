import { TrackDto } from './track';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceTrackDto extends TrackDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
