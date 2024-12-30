import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CurrentProgress {
  @AutoMap()
  @ApiProperty({ type: String })
  itemId: String;

  @AutoMap()
  @ApiProperty({ type: Number })
  progress: Number;
}

export class UpdateProgressDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty({ required: false })
  userId: string;

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  xp: number;

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  spentTime: number;

  @AutoMap()
  @ApiProperty({ required: false, default: [] })
  currentRoadmapsIds?: CurrentProgress[];

  @AutoMap()
  @ApiProperty({ required: false, default: [] })
  currentCoursesIds?: CurrentProgress[];

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
