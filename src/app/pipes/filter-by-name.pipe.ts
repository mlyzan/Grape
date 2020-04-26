import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(arr = [], value: string) {
    if (!arr || arr.length === 0 || !value) {
      return arr;
    } else {
      return arr.filter(e => e.userName.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    }
  }

}
