import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @ApiProperty({ required: false, default: 1 })
  page: number;

  @IsNumber()
  @ApiProperty({ required: false, default: 5 })
  limit: number;
}
