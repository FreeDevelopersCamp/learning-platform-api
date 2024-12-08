import { AutoMap } from '@automapper/classes';
import { CompletedContentDto, ProfileDto } from './profile';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto extends ProfileDto {
  @AutoMap()
  @ApiProperty({ required: true })
  userId: string;

  @AutoMap()
  @ApiProperty({ required: false })
  certifications?: { subtitle: string; certificationsIds: string[] };

  @AutoMap()
  @ApiProperty({ required: false })
  completedContent?: CompletedContentDto;
}
