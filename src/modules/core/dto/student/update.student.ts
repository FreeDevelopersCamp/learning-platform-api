import { StudentDto } from './student';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto extends StudentDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
