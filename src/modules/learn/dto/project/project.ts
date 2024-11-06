import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class HintDto {
  @AutoMap()
  @ApiProperty({ required: false })
  description: string;

  @AutoMap()
  @ApiProperty({ required: false })
  url: string;
}

export class TaskDto {
  @AutoMap()
  @ApiProperty({ required: true })
  title: string;

  @AutoMap()
  @ApiProperty({ required: true })
  description: string;

  @AutoMap()
  @ApiProperty({ required: true })
  xp: number;

  @AutoMap()
  @ApiProperty({ required: false })
  hints?: HintDto[];

  @AutoMap()
  @ApiProperty({ required: false })
  example?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  solution?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  required: string;
}

export class ProjectDto {
  @AutoMap()
  @ApiProperty({ required: true })
  name: string;

  @AutoMap()
  @ApiProperty({ required: true })
  title: string;

  @AutoMap()
  @ApiProperty({ required: true })
  description: string;

  @AutoMap()
  @ApiProperty({ required: true })
  prerequisites: string[];

  @AutoMap()
  @ApiProperty({ required: false, default: '0' })
  status: string;

  @AutoMap()
  @ApiProperty({ required: true })
  category: string;

  @AutoMap()
  @ApiProperty({ required: true })
  topic: string;

  @AutoMap()
  @ApiProperty({ required: true })
  xp: number;

  @AutoMap()
  @ApiProperty({ required: true })
  tasks: TaskDto[];

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  participants?: number;
}
