import { PracticeDto } from './practice';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePracticeDto extends PracticeDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  // @AutoMap()
  // @IsString()
  // @ApiProperty({ required: true })
  // instructorId: string;
}
