import { CertificationDto, CompletedContentDto, ProfileDto } from './profile';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto extends ProfileDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ApiProperty({ required: false })
  certifications?: CertificationDto;

  @AutoMap()
  @ApiProperty({ required: false })
  completedContent?: CompletedContentDto;
}
