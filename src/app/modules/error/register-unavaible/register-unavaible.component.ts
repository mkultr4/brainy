import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register-unavaible,[app-register-unavaible]',
  templateUrl: './register-unavaible.component.html',
  styleUrls: ['./register-unavaible.component.scss']
})
export class RegisterUnavaibleComponent implements OnInit {

  constructor(private titleService: Title) {
    const title = 'Brainy' + ' - ' + 'Registro no disponible';
    this.titleService.setTitle(title);
  }

  ngOnInit() {
  }

}
