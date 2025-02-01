import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
  @ApiProperty({ required: true })
  message: string;

  @ApiProperty({ required: false })
  status: string; // 0 not seen, 1 seen

  @ApiProperty({ required: true })
  userId: string;
}
