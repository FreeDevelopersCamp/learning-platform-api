import { ExamDto } from './exam';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceInstructorDto } from 'src/modules/core/dto/instructor/resource.instructor';
import { ResourceRoadmapDto } from '../roadmap/resource.roadmap';

export class ResourceExamDto extends ExamDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty()
  instructor: ResourceInstructorDto;

  @AutoMap()
  @ApiProperty({ required: false })
  roadmap?: ResourceRoadmapDto;
}
