import { LearnerDto } from './learner';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceUserDto } from '../user/resource.user';
import { ResourceProgressDto } from 'src/modules/learn/dto/progress/resource.progress';

export class ResourceLearnerDto extends LearnerDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty()
  user: ResourceUserDto;

  @AutoMap()
  @ApiProperty({ required: false })
  progress: ResourceProgressDto;
}
