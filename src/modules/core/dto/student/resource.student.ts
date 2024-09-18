import { StudentDto } from './student';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceStudentDto extends StudentDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
