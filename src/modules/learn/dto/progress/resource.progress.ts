import { ProgressDto } from './progress';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceUserDto } from 'src/modules/core/dto/user/resource.user';
import { ResourceRoadmapDto } from '../roadmap/resource.roadmap';
import { ResourceCourseDto } from '../course/resource.course';
import { ResourceProjectDto } from '../project/resource.project';
import { ResourceCertificationDto } from '../certification/resource.certification';

export class ResourceProgressDto extends ProgressDto {
  @AutoMap()
  @ApiProperty({ default: '' })
  _id: string;

  @AutoMap()
  @ApiProperty()
  user: ResourceUserDto;
}

export class UpdateProjectReviewDto {
  @AutoMap()
  @ApiProperty()
  review: string;

  @AutoMap()
  @ApiProperty()
  progressId: string;

  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  url: string;

  @AutoMap()
  @ApiProperty()
  status: string;
}

export class DetailsProgressDto {
  @AutoMap()
  @ApiProperty({ default: '' })
  _id: string;

  @AutoMap()
  @ApiProperty()
  user: ResourceUserDto;

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
  completedCertificates?: ResourceCertificationDto[];
}
