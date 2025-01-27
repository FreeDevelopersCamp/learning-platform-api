import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceProjectDto } from '../project/resource.project';

export class CurrentProgress {
  @AutoMap()
  @ApiProperty({ type: String })
  itemId: String;

  @AutoMap()
  @ApiProperty({ type: Number })
  progress: Number;
}

export class CurrentProjectDto {
  @AutoMap()
  @ApiProperty({ type: ResourceProjectDto })
  project: ResourceProjectDto;

  @AutoMap()
  @ApiProperty({ type: String })
  url: String; // GitHub Repository link

  @AutoMap()
  @ApiProperty({ type: String })
  status: String;

  @AutoMap()
  @ApiProperty({ type: String })
  review: String;
}
export class Bookmarks {
  @AutoMap()
  @ApiProperty({ type: String })
  itemId: String;

  @AutoMap()
  @ApiProperty({ type: String })
  type: String;
}

export class ProgressDto {
  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  xp: number;

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  spentTime: number;

  @AutoMap()
  @ApiProperty({ required: false, default: [] })
  BookmarksIds?: Bookmarks[];

  @AutoMap()
  @ApiProperty({ required: false, default: [] })
  currentRoadmapsIds?: CurrentProgress[];

  @AutoMap()
  @ApiProperty({ required: false, default: [] })
  currentCoursesIds?: CurrentProgress[];

  @AutoMap()
  @ApiProperty({ required: false })
  currentProjects?: CurrentProjectDto[];

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
