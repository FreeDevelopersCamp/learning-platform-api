import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MenuDto {
  @AutoMap()
  @IsString()
  @ApiProperty({ required: true, default: '' })
  name: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: false, default: '' })
  icon: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true, default: '' })
  url: string;

  @AutoMap()
  @ApiProperty({ required: true, default: true })
  isActive: boolean;

  @AutoMap()
  @ApiProperty({ required: false, type: MenuDto, isArray: true })
  subMenu: MenuDto[];
}
