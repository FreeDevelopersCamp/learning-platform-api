import { CertificationDto, CompletedContentDto, ProfileDto } from './profile';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceUserDto } from '../user/resource.user';

export class ResourceProfileDto extends ProfileDto {
  @AutoMap()
  @ApiProperty({ default: '' })
  _id: string;

  @AutoMap()
  @ApiProperty()
  user: ResourceUserDto;

  @AutoMap()
  @ApiProperty()
  certifications?: CertificationDto;

  @AutoMap()
  @ApiProperty()
  completedContent?: CompletedContentDto;
}
