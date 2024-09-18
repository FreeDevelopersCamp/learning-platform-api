import { ProfileDto } from './profile';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto extends ProfileDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
