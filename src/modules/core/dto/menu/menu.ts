import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class MenuDto {
  @AutoMap()
  @IsString()
  @ApiProperty({ required: true, default: '' })
  name: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true, default: '' })
  icon: string;

  @AutoMap()
  @IsString()
  @ApiProperty({ required: true, default: '' })
  url: string;

  @AutoMap()
  @IsNumber()
  @ApiProperty({ required: true, default: 0 })
  order: number;

  @AutoMap()
  @ApiProperty({ required: true, default: [] })
  roles: string[];

  @AutoMap()
  @ApiProperty({ required: true, default: true })
  isActive: boolean;

  @AutoMap()
  @ApiProperty({ required: false, type: MenuDto, isArray: true })
  subMenu: MenuDto[];
}
