import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-feedback-close-toolbar-main,[app-feedback-close-toolbar-main]',
  templateUrl: './feedback-close-toolbar-main.component.html',
  styleUrls: ['./feedback-close-toolbar-main.component.scss']
})
export class FeedbackCloseToolbarMainComponent implements OnInit {
  @Input() dropdownId = 'toolbar-main';
  @Input() btnId = 'btn-toolbar-main';
  @Input() dropdownClass = 'dropdown-toolbar';
  @Input() belowOrigin = true;
  @Input() gutter = 0;
  @Input() canShare = false;
  @Input() canRequestModification = false;
  @Input() canRequestOpen = false;
  @Input() canRequestOpenDirect = false;
  // Outpus
  @Output() onShare = new EventEmitter();
  @Output() onDownload = new EventEmitter();
  @Output() onSendByEmail = new EventEmitter();
  @Output() onSearchComments = new EventEmitter();
  @Output() onRequestModification = new EventEmitter();
  @Output() onRequestOpen = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  share() {
    this.onShare.emit();
  }

  download() {

    this.onDownload.emit();
  }

  sendByEmail() {
    this.onSendByEmail.emit();
  }

  searchComments() {
    this.onSearchComments.emit();
  }
  requestModification() {
    this.onRequestModification.emit();
  }
  requestOpen() {
    this.onRequestOpen.emit();
  }

}
