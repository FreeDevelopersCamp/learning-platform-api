import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = Infinity;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  totalItems?: number = Infinity;

  totalPages: number;
  hasNextPage: boolean;
  nextPage: number | null;
  hasPreviousPage: boolean;
  previousPage: number | null;
}

export class PaginatedResultDto<T> {
  items: T[];
  meta: PaginationMetaDto;
}

export class PaginationMetaDto {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  nextPage: number | null;
  hasPreviousPage: boolean;
  previousPage: number | null;
}
