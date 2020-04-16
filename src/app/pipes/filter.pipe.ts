import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(cities: string[], value: string): Array<string> {
      return cities.filter(e => e.toLowerCase().indexOf(value.toLowerCase()) >= 0);
  }

}
