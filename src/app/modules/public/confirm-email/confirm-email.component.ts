import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  // Subscription
  public subscriptionQueryParams: Subscription;
  constructor(
    private _activatedRouteute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscriptionQueryParams = this._activatedRouteute.paramMap.subscribe(params => {
      console.log(params);
    });
  }

}
