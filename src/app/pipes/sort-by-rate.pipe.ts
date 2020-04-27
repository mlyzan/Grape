import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByRate'
})
export class SortByRatePipe implements PipeTransform {

  transform(arr = [], value: boolean) {
    if (!arr || arr.length === 0 || !value) {
      return arr;
    } else {
      return arr.slice().sort((a, b) => b.rate - a.rate);
    }
  } 

}
