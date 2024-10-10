import { AutoMap } from '@automapper/classes';
import { ContentManagerDto } from './ContentManager';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentManagerDto extends ContentManagerDto {
  @AutoMap()
  @ApiProperty()
  userId: string;
}
