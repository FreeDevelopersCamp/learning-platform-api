import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProgressDto {
  @AutoMap()
  @ApiProperty({ required: true })
  userId: string;

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  xp: number;

  @AutoMap()
  @ApiProperty({ required: false })
  currentRoadmapsIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  currentCoursesIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  currentProjectsIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedRoadmapsIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedCoursesIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedProjectsIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedPracticesIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedTutorialsIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedCertificatesIds?: string[];
}
