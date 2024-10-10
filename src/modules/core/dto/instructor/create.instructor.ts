import { ApiProperty } from '@nestjs/swagger';
import { InstructorDto } from './instructor';
import { AutoMap } from '@automapper/classes';

export class CreateInstructorDto extends InstructorDto {
  @AutoMap()
  @ApiProperty({ required: true })
  userId: string;
}
