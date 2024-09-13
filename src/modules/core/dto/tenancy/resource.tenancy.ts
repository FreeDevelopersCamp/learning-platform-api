import { AutoMap } from '@automapper/classes';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { UserDto } from '../user/user';

export class MongoConnectionDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '', required: true })
  host: string;

  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 0, required: true })
  port: number;

  @AutoMap()
  @IsString()
  @ApiProperty({ default: '' })
  username: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '' })
  password: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '', required: true })
  database: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '', required: true })
  url: string;
}

export class TenancyTraderDto {
  @ApiProperty({ default: '', required: true })
  name: string;
}

export class ResourceTenancyDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @IsNotEmptyObject()
  @ApiProperty({ type: MongoConnectionDto })
  mongoConnections: MongoConnectionDto;

  @AutoMap()
  @IsNotEmptyObject()
  @ApiProperty({ type: TenancyTraderDto })
  trader: TenancyTraderDto;

  @AutoMap()
  @IsBoolean()
  @ApiProperty({ default: true, required: true })
  active: boolean;

  @AutoMap()
  @IsString()
  @ApiProperty({ default: '', required: true })
  alias: string;

  @AutoMap()
  @IsObject()
  @ApiProperty({ type: UserDto, required: true })
  user: UserDto;

  @AutoMap()
  @IsBoolean()
  @ApiHideProperty()
  @ApiProperty({ default: false, required: false })
  systemOwner: boolean;
}
