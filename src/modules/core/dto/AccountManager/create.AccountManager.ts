import { ApiProperty } from '@nestjs/swagger';
import { AccountManagerDto } from './AccountManager';
import { AutoMap } from '@automapper/classes';

export class CreateAccountManagerDto extends AccountManagerDto {
  @AutoMap()
  @ApiProperty()
  userId: string;
}
