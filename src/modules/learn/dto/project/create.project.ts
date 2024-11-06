import { AutoMap } from '@automapper/classes';
import { ProjectDto } from './project';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto extends ProjectDto {
  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  instructorId: string;
}
