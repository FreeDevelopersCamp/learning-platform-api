import { ProgressDto } from './progress';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceUserDto } from 'src/modules/core/dto/user/resource.user';

export class ResourceProgressDto extends ProgressDto {
  @AutoMap()
  @ApiProperty({ default: '' })
  _id: string;

  @AutoMap()
  @ApiProperty()
  user: ResourceUserDto;
}
