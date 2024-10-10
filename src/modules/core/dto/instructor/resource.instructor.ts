import { InstructorDto } from './instructor';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceUserDto } from '../user/resource.user';

export class ResourceInstructorDto extends InstructorDto {
  @AutoMap()
  @ApiProperty()
  user: ResourceUserDto;

  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
