import { TeacherDto } from './teacher';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceTeacherDto extends TeacherDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
