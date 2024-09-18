import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsString } from 'class-validator';
import { Course } from '../../entity/course/course.schema';

export class RoadmapDto {
  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  description: string;

  @AutoMap()
  @IsArray()
  @ApiProperty({ required: true, type: String })
  categories: string[];

  @AutoMap()
  @IsObject()
  @ApiProperty({ required: true, type: [Course] })
  courses: Course[];
}
