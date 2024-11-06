import { CourseDto } from './course';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceInstructorDto } from 'src/modules/core/dto/instructor/resource.instructor';

export class ResourceCourseDto extends CourseDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty({ required: true })
  instructor: ResourceInstructorDto;

  @AutoMap()
  @ApiProperty({ required: false })
  parentId?: string;

  @AutoMap()
  @ApiProperty({ required: false, isArray: true })
  subCourses?: ResourceCourseDto[];
}
