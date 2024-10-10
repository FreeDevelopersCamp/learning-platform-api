import { LearnerDto } from './learner';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLearnerDto extends LearnerDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
