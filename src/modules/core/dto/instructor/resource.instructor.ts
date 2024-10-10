import { InstructorDto } from './instructor';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceUserDto } from '../user/resource.user';

export class ResourceInstructorDto extends InstructorDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty()
  user: ResourceUserDto;

  @AutoMap()
  @ApiProperty()
  status: string; // from lookup
}
