import { NotificationDto } from './notification';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ResourceNotificationDto extends NotificationDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
