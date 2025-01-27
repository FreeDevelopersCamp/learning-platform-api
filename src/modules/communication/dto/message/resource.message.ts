import { AutoMap } from '@automapper/classes';
import { MessageDto } from './message';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceMessageDto extends MessageDto {
  @AutoMap()
  @ApiProperty({ default: '' })
  _id: string;
}
