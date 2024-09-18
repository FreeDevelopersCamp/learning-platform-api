import { RoadmapDto } from './roadmap';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoadmapDto extends RoadmapDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
