import { InstructorDto } from './instructor';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInstructorDto extends InstructorDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
