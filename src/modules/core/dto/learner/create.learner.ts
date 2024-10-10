import { ApiProperty } from '@nestjs/swagger';
import { LearnerDto } from './learner';
import { AutoMap } from '@automapper/classes';

export class CreateLearnerDto extends LearnerDto {
  @AutoMap()
  @ApiProperty({ required: true })
  userId: string;
}
