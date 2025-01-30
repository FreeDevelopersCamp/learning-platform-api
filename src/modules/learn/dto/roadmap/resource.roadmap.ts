import { RoadmapDto } from './roadmap';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceInstructorDto } from 'src/modules/core/dto/instructor/resource.instructor';
import { ResourceCourseDto } from '../course/resource.course';
import { ResourcePracticeDto } from '../practice/resource.practice';
import { ResourceProjectDto } from '../project/resource.project';
import { ResourceExamDto } from '../exam/resource.exam';
import { ResourceCertificationDto } from '../certification/resource.certification';

type OrderItem =
  | ResourceCourseDto
  | ResourcePracticeDto
  | ResourceProjectDto
  | ResourceExamDto
  | ResourceCertificationDto;

export class ResourceRoadmapDto extends RoadmapDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty({ required: true })
  instructor: ResourceInstructorDto;

  @AutoMap()
  @ApiProperty({ required: true, type: [ResourceCourseDto] })
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
  relatedRoadmaps?: ResourceRoadmapDto[];

  @AutoMap()
  @ApiProperty({ required: true })
  order: OrderItem[];
}
