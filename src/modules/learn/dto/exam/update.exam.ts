import { ExamDto } from './exam';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExamDto extends ExamDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
