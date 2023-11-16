import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, state, transition, useAnimation, style } from '@angular/animations';
import { fadeAnimation } from '../../../app.animations';
import { User } from 'src/app/models/users/user';
@Component({
  selector: 'app-dashboard-daily-message',
  templateUrl: './dashboard-daily-message.component.html',
  styleUrls: ['./dashboard-daily-message.component.scss'],
  animations: [
    trigger('dailyMessageAnimation', [
      state('*', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('* => void', [
        useAnimation(fadeAnimation, { params: { from: 1, to: 0, time: '300ms 300ms' } }),
      ]),
      transition('void => *', [
        useAnimation(fadeAnimation, { params: { from: 0, to: 1, time: '300ms 300ms' } }),
      ])
    ]),
  ],
  providers: []
})

export class DashboardDailyMessageComponent implements OnInit, OnDestroy {
  // Public vars
  show = false;
  messages = [];
  @Input() user: User;

  constructor(
  ) {

  }

  ngOnInit() {
    // this.resize();

  }
  showModal(messages) {
    this.messages = messages;
    this.show = true;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('overflow-hidden');
  }
  close() {
    this.show = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('overflow-hidden');
    this.messages = [];
  }




  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('overflow-hidden');
  }

}
