import { AssignmentDto } from './assignment';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceAssignmentDto extends AssignmentDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
