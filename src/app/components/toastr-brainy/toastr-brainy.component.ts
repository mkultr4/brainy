import { Component } from '@angular/core';
import {
  trigger,
  state,
  transition,
  animate,
  style
} from '@angular/animations';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-toastr-brainy-component,[app-toastr-brainy-component]',
  styles: [],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        display: 'none',
        opacity: 0
      })),
      state('active', style({ opacity: 1 })),
      state('removed', style({ opacity: 0 })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => removed', animate('300ms ease-in')),
    ]),
  ],
  templateUrl: './toastr-brainy.component.html',
  styleUrls: ['./toastr-brainy.component.scss']
})
export class ToastrBrainyComponent extends Toast {
  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage
  ) {

    super(toastrService, toastPackage);
  }



}
