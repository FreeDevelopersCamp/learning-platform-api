import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SettingDto {
  @AutoMap()
  @IsString()
  @ApiProperty({ required: true, default: '' })
  key: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true, default: 'true' })
  value: string;
}
