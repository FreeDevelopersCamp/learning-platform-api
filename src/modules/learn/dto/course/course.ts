import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CourseResourceDto {
  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @AutoMap()
  @ApiProperty({ required: false })
  id?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  url?: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  type: string; // article video ...

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  tag: string; // free or paid resource
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
  @ApiProperty({ required: false })
  tips?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  rating?: string;

  @AutoMap()
  @ApiProperty({ required: false, type: CourseResourceDto, isArray: true })
  resources?: CourseResourceDto[];
}
