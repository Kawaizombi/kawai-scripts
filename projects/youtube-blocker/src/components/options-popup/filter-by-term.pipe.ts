import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterByTerm' })
export class FilterByTerm implements PipeTransform {
  transform(items: string[], term?: string): string[] {
    return !term ? items : items.filter((item) => {
      return item.toLowerCase().includes(term.toLowerCase());
    });
  }
}
