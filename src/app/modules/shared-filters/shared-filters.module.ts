import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DropdownOrderComponent } from './dropdown-order/dropdown-order.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DropdownOrderComponent
  ],
  exports: [
    DropdownOrderComponent
  ]
})
export class SharedFiltersModule { }
