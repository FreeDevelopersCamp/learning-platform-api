import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { CourseResource } from '../../entity/course/course.schema';

export class UpdateCourseDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty({ required: false })
  name: string;

  @AutoMap()
  @ApiProperty({ required: false })
  description: string;

  @AutoMap()
  @ApiProperty({ required: false })
  category: string;

  @AutoMap()
  @ApiProperty({ required: false })
  topic: string;

  @AutoMap()
  status: string; // from lookup

  @AutoMap()
  @ApiProperty({ required: false })
  duration: number;

  @AutoMap()
  @ApiProperty({ required: false })
  subCoursesIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  parentId?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  resources?: CourseResource[];

  @AutoMap()
  @ApiProperty({ required: false })
  tips?: string[];
}
