import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceRoadmapDto } from '../roadmap/resource.roadmap';
import { ResourceCourseDto } from '../course/resource.course';
import { ResourceProjectDto } from '../project/resource.project';
import { ResourcePracticeDto } from '../practice/resource.practice';
import { ResourceTutorialDto } from '../tutorial/resource.tutorial';
import { ResourceCertificationDto } from '../certification/resource.certification';

export class ProgressDto {
  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  xp: number;

  @AutoMap()
  @ApiProperty({ required: false })
  currentRoadmaps?: ResourceRoadmapDto[];

  @AutoMap()
  @ApiProperty({ required: false })
  currentCourses?: ResourceCourseDto[];

  @AutoMap()
  @ApiProperty({ required: false })
  currentProjects?: ResourceProjectDto[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedRoadmaps?: ResourceRoadmapDto[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedCourses?: ResourceCourseDto[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedProjects?: ResourceProjectDto[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedPractices?: ResourcePracticeDto[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedTutorials?: ResourceTutorialDto[];

  @AutoMap()
  @ApiProperty({ required: false })
  completedCertificates?: ResourceCertificationDto[];
}
