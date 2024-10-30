import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class AccountManagerDto {
  @AutoMap()
  @ApiProperty({ default: '1' })
  status: string;
}
