import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionsDto {
  @AutoMap()
  @ApiProperty({ required: true })
  question: string;

  @AutoMap()
  @ApiProperty({ required: true })
  choice1?: string;

  @AutoMap()
  @ApiProperty({ required: true })
  choice2: string;

  @AutoMap()
  @ApiProperty({ required: false })
  choice3?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  choice4?: string;

  @AutoMap()
  @ApiProperty({ required: true })
  correctAnswer: string;
}

export class ExamDto {
  @AutoMap()
  @ApiProperty({ required: true })
  name: string;

  @AutoMap()
  @ApiProperty({ required: false, default: '0' })
  status?: string; // lookup

  @AutoMap()
  @ApiProperty({ required: false })
  prerequisites?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  category?: string; // lookup

  @AutoMap()
  @ApiProperty({ required: false })
  topic?: string; // lookup

  @AutoMap()
  @ApiProperty({ required: false })
  xp?: number;

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  duration?: number; // minutes

  @AutoMap()
  @ApiProperty({ required: false })
  challengesToPass?: number;

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  participants?: number;

  @AutoMap()
  @ApiProperty({ required: false, default: [] })
  questions?: QuestionsDto[];
}
