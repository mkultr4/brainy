import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { Piece } from '../../../models/feedback/piece';
import { ComparedVersion } from '../services/feedback-version-comunication.service';

@Component({
  selector: 'app-feedback-version-box,[app-feedback-version-box]',
  templateUrl: './feedback-version-box.component.html',
  styleUrls: ['./feedback-version-box.component.scss']
})
export class FeedbackVersionBoxComponent implements OnInit {

  @Input() piece: Piece;
  @Input() compareVersion = false;
  @Input() isCompareVersion: ComparedVersion;
  @Input() actualVersion = false;
  @Output() boxOnCompareVersion = new EventEmitter();
  @Output() boxOnRemoveCompare = new EventEmitter();
  @Output() boxOnShowVersion = new EventEmitter();
  constructor(
  ) { }

  ngOnInit() {
  }
  showVersion() {
    this.boxOnShowVersion.emit(this.piece);
  }
  compareClickBox($event) {
    if (this.isCompareVersion) {
      this.compare();
    } else {
      this.boxOnShowVersion.emit(this.piece);
    }
  }
  compare($event = null) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    if (this.compareVersion) {
      this.boxOnRemoveCompare.emit(this.piece);
    } else {
      this.boxOnCompareVersion.emit(this.piece);
    }
  }
}
