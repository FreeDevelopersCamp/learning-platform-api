import { EmailDto } from './email';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmailDto extends EmailDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
