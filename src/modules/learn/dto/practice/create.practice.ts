import { AutoMap } from '@automapper/classes';
import { PracticeDto } from './practice';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePracticeDto extends PracticeDto {
  @AutoMap()
  @IsString()
  @ApiProperty({ required: true })
  instructorId: string;
}
