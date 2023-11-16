import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-service-unavaible,[app-service-unavaible]',
  templateUrl: './service-unavaible.component.html',
  styleUrls: ['./service-unavaible.component.scss']
})
export class ServiceUnavaibleComponent implements OnInit {

  constructor(private titleService: Title) {
    const title = 'Brainy' + ' - ' + 'Servicio no disponible';
    this.titleService.setTitle(title);
  }

  ngOnInit() {
  }

}
