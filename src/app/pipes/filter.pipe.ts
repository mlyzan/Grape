import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(cities = [], value = ''): Array<string> {
    if (!cities || cities.length === 0 || !value) {
      return [];
    } else {
      return cities.filter(e => e.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    }
  }

}
