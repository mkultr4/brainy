import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-brief-toolbar-comments',
  templateUrl: './brief-toolbar-comments.component.html',
  styleUrls: ['./brief-toolbar-comments.component.scss']
})
export class BriefToolbarCommentsComponent implements OnInit {
  // Inputs
  @Input() top;
  @Input() show = false;
  @Input() enabledCommentsAction;
  // Outputs
  @Output() toolbarOnActivateComments = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  enableComments(){
    const enabled = !this.enabledCommentsAction;
    this.toolbarOnActivateComments.emit(enabled);
  }
}
