import { Component, OnInit, Output, EventEmitter, Input,  HostListener } from '@angular/core';
import { BriefPresentationSlide } from 'src/app/models/brief-presentation/brief-presentation-slide';

@Component({
  selector: 'app-brief-presentation-slide-sidenav',
  templateUrl: './brief-presentation-slide-sidenav.component.html',
  styleUrls: ['./brief-presentation-slide-sidenav.component.scss'],
  host:{
    'class':'brief-presentation-item-sidenav closest-alert'
  }
  
})
export class BriefPresentationSlideSidenavComponent implements OnInit {
  // Input
  @Input() slide: BriefPresentationSlide = new BriefPresentationSlide();
  @Input() slideToShowId;
  @Input() index: string;
  @Input() editable = true
  // Outputs
  @Output() onShowSlide = new EventEmitter();
  @Output() onDeleteSlide = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  showSlide() {
    this.onShowSlide.emit(this.slide);
  }
  mouseDownDelete($event){
    $event.stopPropagation();
    $event.preventDefault();
   
  }
  delete(){
    this.onDeleteSlide.emit(this.slide);
  }
}
