import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @AutoMap()
  @ApiProperty({ required: true })
  senderId: String;

  @AutoMap()
  @ApiProperty({ required: true })
  receiverId: String;

  @AutoMap()
  @ApiProperty({ required: true })
  content: String;

  @AutoMap()
  @ApiProperty({ required: false })
  timestamp?: Date;

  @AutoMap()
  @ApiProperty({ required: false })
  status?: String;
}
