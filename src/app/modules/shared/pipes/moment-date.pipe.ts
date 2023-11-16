import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'momentDate'
})
export class MomentDatePipe implements PipeTransform {

  transform(value: any, format: string, locale?: string): any {
    let lo = 'es';
    if (locale) {
      lo = locale;
    }

    return moment(value).locale(lo).format(format);
  }

}
