import { FrequentlyAskedQuestionsDto } from './roadmap';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoadmapDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  // @AutoMap()
  // @ApiProperty({ required: true })
  // instructorId: string;

  @AutoMap()
  @ApiProperty({ required: false })
  coursesIds: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  name: string;

  @AutoMap()
  @ApiProperty({ required: false })
  description: string;

  @AutoMap()
  @ApiProperty({ required: false })
  tag: string;

  @AutoMap()
  @ApiProperty({ required: false })
  category: string;

  @AutoMap()
  @ApiProperty({ required: false })
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
  @ApiProperty({ required: false })
  rating?: string;

  @AutoMap()
  @ApiProperty({ required: false, default: [] })
  raters?: string[];

  @AutoMap()
  @ApiProperty({ required: false, default: 0 })
  duration?: number; // minutes

  @AutoMap()
  @ApiProperty({
    required: false,
    type: [FrequentlyAskedQuestionsDto],
    default: [],
  })
  frequentlyAskedQuestions?: FrequentlyAskedQuestionsDto[];

  @AutoMap()
  @ApiProperty({ required: false })
  practicesIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  projectsIds?: string[];

  @AutoMap()
  @ApiProperty({ required: false })
  examId?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  order: any;

  @AutoMap()
  @ApiProperty({ required: false })
  certificationId?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  relatedRoadmapsIds?: string[];
}
