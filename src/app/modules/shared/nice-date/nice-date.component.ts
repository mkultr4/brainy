import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nice-date,[app-nice-date]',
  templateUrl: './nice-date.component.html',
  styleUrls: ['./nice-date.component.scss']
})
export class NiceDateComponent implements OnInit {
  public minutes = 0;
  public hours = 0;
  public days = 0;
  public weeks = 0;
  @Input() date: Date;
  @Input() format = 'DD/MM/YYYY HH:ss';
  constructor() {

  }

  ngOnInit() {
    const _value = Number(this.date);
    const date = new Date(_value),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      daydiff = Math.floor(diff / 86400);

    this.minutes = Math.floor(diff / 60);
    this.hours = Math.floor(diff / 3600);
    this.days = daydiff;
    this.weeks = Math.ceil(daydiff / 7);
  }

}
