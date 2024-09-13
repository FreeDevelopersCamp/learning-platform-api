import { SettingDto } from './setting';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSettingDto extends SettingDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;
}
