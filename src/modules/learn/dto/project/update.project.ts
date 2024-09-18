import { ProjectDto } from './project';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto extends ProjectDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
