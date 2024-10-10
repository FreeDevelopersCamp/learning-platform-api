import { AccountManagerDto } from './AccountManager';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountManagerDto extends AccountManagerDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
