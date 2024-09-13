import { LookupItemDto } from './lookup';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class UpdateLookupDto {
  @ApiProperty({ default: '' })
  @AutoMap()
  _id: string;

  @AutoMap()
  @ValidateNested()
  @ApiProperty({ type: LookupItemDto, isArray: true })
  items: LookupItemDto[];
}
