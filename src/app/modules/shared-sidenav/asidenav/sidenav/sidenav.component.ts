import { Component, OnInit , ElementRef} from '@angular/core';

@Component({
  selector: 'app-sidenav,[app-sidenav]',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public sidenavEl: ElementRef) { }

  ngOnInit() {
  }

}
