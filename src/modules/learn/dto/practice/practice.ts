import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ChallengeDto {
  @AutoMap()
  @ApiProperty({ required: true })
  description: string;

  @AutoMap()
  @ApiProperty({ required: false })
  example?: string;

  @AutoMap()
  @ApiProperty({ required: true })
  xp: number;

  @AutoMap()
  @ApiProperty({ required: false })
  expectedOutput?: string;
}

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

export class PracticeDto {
  @AutoMap()
  @ApiProperty({ required: true })
  name: string;

  @AutoMap()
  @ApiProperty({ required: false, default: '0' })
  status: string; // lookup

  @AutoMap()
  @ApiProperty({ required: true, isArray: true })
  prerequisites: string[];

  @AutoMap()
  @ApiProperty({ required: true })
  category: string; // lookup

  @AutoMap()
  @ApiProperty({ required: true })
  topic: string; // lookup

  @AutoMap()
  @ApiProperty({ required: true })
  xp: number;

  @AutoMap()
  @ApiProperty({ required: true, default: 0 })
  duration: number; // minutes

  @AutoMap()
  @ApiProperty({ required: true })
  challengesToPass: number;

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  participants?: number;

  @AutoMap()
  @ApiProperty({ required: false, isArray: true, default: [] })
  challenges: ChallengeDto[];

  @AutoMap()
  @ApiProperty({ required: true, isArray: true, default: [] })
  questions: QuestionsDto[];
}
