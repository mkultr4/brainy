import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBtnLoading]'
})
export class BtnLoadingDirective {
  @HostBinding('class.btn-loading')
  @Input() appBtnLoading = false;
  constructor() { }

}
