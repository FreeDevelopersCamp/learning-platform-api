import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class FrequentlyAskedQuestionsDto {
  @AutoMap()
  @ApiProperty({ required: true })
  question: string;

  @AutoMap()
  @ApiProperty({ required: false })
  answer?: string;
}

export class RoadmapDto {
  @AutoMap()
  @ApiProperty({ required: true })
  name: string;

  @AutoMap()
  @ApiProperty({ required: true })
  description: string;

  @AutoMap()
  @ApiProperty({ required: true })
  tag: string;

  @AutoMap()
  @ApiProperty({ required: true })
  category: string;

  @AutoMap()
  @ApiProperty({ required: true })
  topic: string;

  @AutoMap()
  @ApiProperty({ required: false, default: '0' })
  status: string;

  @AutoMap()
  @ApiProperty({ required: false })
  keywords?: string[]; // from lookup

  @AutoMap()
  @ApiProperty({ required: false })
  prerequisites?: string[];

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  participants?: number;

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  xp?: number;

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  duration?: number; // hours

  @AutoMap()
  @ApiProperty({
    required: false,
    type: [FrequentlyAskedQuestionsDto],
    default: [],
  })
  frequentlyAskedQuestions?: FrequentlyAskedQuestionsDto[];
}
