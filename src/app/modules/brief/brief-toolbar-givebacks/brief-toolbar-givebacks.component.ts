import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-brief-toolbar-givebacks',
  templateUrl: './brief-toolbar-givebacks.component.html',
  styleUrls: ['./brief-toolbar-givebacks.component.scss']
})
export class BriefToolbarGivebacksComponent implements OnInit {
 // Inputs
 @Input() top;
 @Input() show = false;
 // Outputs
 @Output() toolbarOnAddGiveBack = new EventEmitter();
 constructor() { }

 ngOnInit() {
 }

 addReturn(){
   this.toolbarOnAddGiveBack.emit();
 }
}
