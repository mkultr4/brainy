import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCustomerStatus'
})
export class FilterCustomerStatusPipe implements PipeTransform {

  transform(customers: any, status?: any): any {
    let filterValues = customers;
    if (status !== 'all') {
      filterValues = customers.filter(c => c.status === status);
    }

    return filterValues;

  }
}
