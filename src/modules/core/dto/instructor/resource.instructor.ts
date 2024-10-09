import { InstructorDto } from './instructor';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceInstructorDto extends InstructorDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
