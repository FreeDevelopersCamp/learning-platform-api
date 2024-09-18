import { TutorialDto } from './tutorial';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceTutorialDto extends TutorialDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
