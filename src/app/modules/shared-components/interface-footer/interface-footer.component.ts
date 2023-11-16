import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-interface-footer',
  templateUrl: './interface-footer.component.html',
  styleUrls: ['./interface-footer.component.scss']
})
export class InterfaceFooterComponent implements OnInit {
  @Input() extraClass = '';
  constructor() { }

  ngOnInit() {
  }

}
