import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ResourceCourseDto } from 'src/modules/learn/dto/course/resource.course';
import { ResourceRoadmapDto } from 'src/modules/learn/dto/roadmap/resource.roadmap';

export class InstructorDto {
  @AutoMap()
  @ApiProperty({ default: '1' })
  status: string;

  @ApiProperty({ required: false })
  @AutoMap()
  @IsArray()
  courses?: ResourceCourseDto[];

  @ApiProperty({ required: false })
  @AutoMap()
  @IsArray()
  roadmaps?: ResourceRoadmapDto[];
}
