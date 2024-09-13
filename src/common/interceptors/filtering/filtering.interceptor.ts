import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilteringService } from './filtering.service';

@Injectable()
export class FilterInterceptor implements NestInterceptor {
  constructor(private readonly filteringService: FilteringService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const filters = request.query.filters
      ? decodeURIComponent(request.query.filters)
      : '';

    return next.handle().pipe(
      map((data) => {
        if (data && Array.isArray(data.items)) {
          const filteredItems = this.filteringService.applyFilters(
            data.items,
            filters,
          );

          return {
            ...data,
            items: filteredItems,
          };
        } else {
          return data;
        }
      }),
    );
  }
}
