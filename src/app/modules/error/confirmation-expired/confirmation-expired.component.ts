import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-confirmation-expired,[app-confirmation-expired]',
  templateUrl: './confirmation-expired.component.html',
  styleUrls: ['./confirmation-expired.component.scss']
})
export class ConfirmationExpiredComponent implements OnInit {

  constructor(private titleService: Title) {
    const title = 'Brainy' + ' - ' + 'Confirmación expirada';
    this.titleService.setTitle(title);
  }

  ngOnInit() {
  }

}
