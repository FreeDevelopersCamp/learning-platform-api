import { PracticeDto } from './practice';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceInstructorDto } from 'src/modules/core/dto/instructor/resource.instructor';

export class ResourcePracticeDto extends PracticeDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty({ required: true })
  instructor: ResourceInstructorDto;
}
