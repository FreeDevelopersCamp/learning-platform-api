import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceUserDto } from '../user/resource.user';
import { IsArray } from 'class-validator';
import { ResourceCourseDto } from 'src/modules/learn/dto/course/resource.course';
import { ResourceRoadmapDto } from 'src/modules/learn/dto/roadmap/resource.roadmap';

export class InstructorDto {
  @AutoMap()
  @ApiProperty({ required: true })
  user: ResourceUserDto;

  @ApiProperty({ required: false })
  @AutoMap()
  @IsArray()
  courses?: ResourceCourseDto[];

  @ApiProperty({ required: false })
  @AutoMap()
  @IsArray()
  roadmaps?: ResourceRoadmapDto[];
}
