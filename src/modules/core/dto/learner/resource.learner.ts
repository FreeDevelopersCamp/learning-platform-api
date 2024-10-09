import { LearnerDto } from './learner';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceLearnerDto extends LearnerDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
