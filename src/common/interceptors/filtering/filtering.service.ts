import { Injectable } from '@nestjs/common';

@Injectable()
export class FilteringService {
  applyFilters<T>(items: T[], filters: string): T[] {
    if (!filters) {
      return items;
    }

    const filterPairs = this.parseFilters(filters);

    const filteredItems = items.filter((item) => {
      const isMatch = filterPairs.every(({ key, value }) => {
        if (!item.hasOwnProperty(key)) {
          return false;
        }
        const itemValue = this.normalizeString(item[key]?.toString());
        const filterValue = this.normalizeString(value);
        const match = itemValue.includes(filterValue);
        return match;
      });

      if (isMatch) {
      } else {
      }

      return isMatch;
    });

    return filteredItems;
  }

  private parseFilters(filters: string): Array<{ key: string; value: string }> {
    return filters.split('&').map((filter) => {
      const [key, value] = filter.split('=');
      return {
        key: decodeURIComponent(key).trim(),
        value: decodeURIComponent(value).toLowerCase().trim(),
      };
    });
  }

  private normalizeString(str: string): string {
    return str.toLowerCase().replace(/['"]/g, '').trim();
  }
}
