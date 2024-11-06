import { AutoMap } from '@automapper/classes';
import { CourseDto } from './course';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto extends CourseDto {
  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  instructorId: string;
}
