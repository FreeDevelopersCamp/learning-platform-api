import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { CurrentProject } from '../../entity/progress/progress.schema';

export class CurrentProgress {
  @AutoMap()
  @ApiProperty({ type: String })
  itemId: String;

  @AutoMap()
  @ApiProperty({ type: Number })
  progress: Number;
}

export class Bookmarks {
  @AutoMap()
  @ApiProperty({ type: String })
  itemId: String;

  @AutoMap()
  @ApiProperty({ type: String })
  type: String;
}

export class CreateProgressDto {
  @AutoMap()
  @ApiProperty({ required: true })
  userId: string;

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
  currentProjectsIds?: CurrentProject[];

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
