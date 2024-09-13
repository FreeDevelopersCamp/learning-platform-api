import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

export class ParentLookupDto {
  @ApiProperty({ required: false })
  @IsString()
  @AutoMap()
  key: string; //name of parent lookup

  @ApiProperty({ required: false })
  @IsString()
  @AutoMap()
  value: string; //item id of parent lookup
}

export class LookupItemDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '' })
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: '' })
  label: string;

  @ApiProperty({ default: 0 })
  @AutoMap()
  order: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: ParentLookupDto })
  parent: ParentLookupDto;
}

export class LookupDto {
  @AutoMap()
  @ApiProperty({ maxLength: 30, default: '' })
  name: string;

  @AutoMap()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty({ type: LookupItemDto, isArray: true })
  items: LookupItemDto[];
}
