import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class LearnerDto {
  @AutoMap()
  @ApiProperty({ default: '1' })
  status: string;
}
