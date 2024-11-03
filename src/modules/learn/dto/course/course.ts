import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CourseResource } from '../../entity/course/course.schema';

export class CourseDto {
  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  description: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  category: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  topic: string;

  @AutoMap()
  status: string; // from lookup

  @AutoMap()
  @ApiProperty({ required: true, default: 0 })
  @IsNumber()
  duration: number;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNumber()
  xp: number;

  @AutoMap()
  @ApiProperty({ required: false, isArray: true })
  subCoursesIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  parentId?: string;

  @AutoMap()
  @ApiProperty({ required: false, type: CourseResource, isArray: true })
  resources?: CourseResource[];

  @AutoMap()
  @ApiProperty({ required: false })
  tips?: string[];
}
