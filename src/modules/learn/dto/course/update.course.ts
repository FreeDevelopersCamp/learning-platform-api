import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { CourseResource } from '../../entity/course/course.schema';
import { IsString } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  description: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  resources: CourseResource[];

  @AutoMap()
  @IsString()
  @ApiProperty({ required: false })
  tips: string[];
}
