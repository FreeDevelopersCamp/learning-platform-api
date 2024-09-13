import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import configurations from 'src/config/configurations';
import { UserDto } from '../user/user';
import { CreateUserDto } from '../user/create.user';

export class MongoConnectionDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: configurations().database.host, required: true })
  host: string;

  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: configurations().database.port, required: true })
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

export class CreateTenancyDto {
  @AutoMap()
  @ApiProperty({ type: MongoConnectionDto, required: true })
  mongoConnections: MongoConnectionDto;

  //   @AutoMap()
  //   @ApiProperty({ type: TenancyTraderDto, required: true })
  //   trader: TenancyTraderDto;

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
  user: CreateUserDto;
}
