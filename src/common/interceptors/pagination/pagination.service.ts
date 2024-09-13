import { Injectable } from '@nestjs/common';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class PaginationService {
  paginate<T>(items: T[], paginationDto: PaginationDto) {
    const page = paginationDto.page ?? 1;
    const limit = paginationDto.limit ?? items.length;

    const totalItems = items.length;

    const totalPages = limit > 0 ? Math.ceil(totalItems / limit) : 1;

    const currentPage = Math.max(1, Math.min(page, totalPages));

    if (limit === 0 || limit >= totalItems) {
      return {
        items,
        meta: {
          page: 1,
          limit: totalItems,
          totalItems,
          totalPages: 1,
          hasNextPage: false,
          nextPage: null,
          hasPreviousPage: false,
          previousPage: null,
        },
      };
    }

    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalItems);

    const paginatedItems = items.slice(startIndex, endIndex);

    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    return {
      items: paginatedItems,
      meta: {
        page: currentPage,
        limit,
        totalItems,
        totalPages,
        hasNextPage,
        nextPage: hasNextPage ? currentPage + 1 : null,
        hasPreviousPage,
        previousPage: hasPreviousPage ? currentPage - 1 : null,
      },
    };
  }
}
