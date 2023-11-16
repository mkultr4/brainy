import { Pipe, PipeTransform } from '@angular/core';
import { MomentDatePipe } from './moment-date.pipe';
@Pipe({
  name: 'niceDateFormatPipe',
})
export class NiceDateFormatPipe implements PipeTransform {
  constructor() {
  }
  transform(value: string, format) {
    const date = new Date(value),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      daydiff = Math.floor(diff / 86400);


    if (daydiff < 2) {
      return this.convertToNiceDate(daydiff);

    } else {
      const datePipe = new MomentDatePipe();
      value = datePipe.transform(value, format);
      return value;
    }
  }

  convertToNiceDate(daydiff: number) {

    /*var datePipe = new MomentDatePipe();
    let hourFormated = datePipe.transform(time, hourFormat);*/
    return daydiff === 0 && 'dates.today' ||
      daydiff === 1 && 'dates.yesterday' ||
       daydiff === 2 && 'dates.before-yesterday';
  }
}
