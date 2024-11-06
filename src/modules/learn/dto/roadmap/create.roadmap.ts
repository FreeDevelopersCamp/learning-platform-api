import { ApiProperty } from '@nestjs/swagger';
import { RoadmapDto } from './roadmap';
import { AutoMap } from '@automapper/classes';

export class CreateRoadmapDto extends RoadmapDto {
  @AutoMap()
  @ApiProperty({ required: true })
  instructorId: string;

  @AutoMap()
  @ApiProperty({ required: true })
  coursesIds: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  practicesIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  projectsIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  examId?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  certificationId?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  relatedRoadmapsIds?: string[];

  @AutoMap()
  @ApiProperty({ required: true })
  orderIds: string[];
}
