import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class InstructorDto {
  @AutoMap()
  @ApiProperty({ default: '1' })
  status: string;

  @ApiProperty({ required: false })
  @AutoMap()
  coursesIds?: string[];

  @ApiProperty({ required: false })
  @AutoMap()
  roadmapsIds?: string[];
}
