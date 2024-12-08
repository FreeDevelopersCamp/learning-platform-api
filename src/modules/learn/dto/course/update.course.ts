import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { CourseResource } from '../../entity/course/course.schema';
import { CourseDto } from './course';

export class UpdateCourseDto extends CourseDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty({ required: false })
  subCoursesIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  parentId?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  resources?: CourseResource[];
}

export class RatingDto {
  @ApiProperty({ default: '', required: false })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty({ required: false })
  courseId: string;

  @AutoMap()
  @ApiProperty({ required: false })
  roadmapId: string;

  @AutoMap()
  @ApiProperty({ required: false })
  userId: string;

  @AutoMap()
  @ApiProperty({ required: true })
  rating: string;
}
