import { AssignmentDto } from './assignment';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAssignmentDto extends AssignmentDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
