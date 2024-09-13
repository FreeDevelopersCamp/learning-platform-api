import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationService } from './pagination.service';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  constructor(private readonly paginationService: PaginationService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const query = request.query;

    const page = query.page ? parseInt(query.page, 10) : 1;
    const limit = query.limit ? parseInt(query.limit, 10) : Infinity;

    const paginationDto: PaginationDto = {
      page,
      limit,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      nextPage: null,
      hasPreviousPage: false,
      previousPage: null,
    };

    return next.handle().pipe(
      map((data) => {
        if (data && data.items && data.meta) {
          return data;
        }

        return this.paginationService.paginate(data, paginationDto);
      }),
    );
  }
}
