import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CourseResourceDto {
  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @AutoMap()
  @IsUrl()
  @ApiProperty({ required: true })
  url: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  type: string; // article video ...

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  category: string; // free or paid resource
}

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
  @ApiProperty({ required: true, type: [CourseResourceDto] })
  resources: CourseResourceDto[];

  @AutoMap()
  @IsString()
  @ApiProperty({ required: false })
  tips?: string[];
}
