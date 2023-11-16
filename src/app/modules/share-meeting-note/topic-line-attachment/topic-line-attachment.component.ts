import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';

@Component({
  selector: '[app-topic-line-attachment]',
  templateUrl: './topic-line-attachment.component.html',
  styleUrls: ['./topic-line-attachment.component.scss']
})
export class TopicLineAttachmentComponent implements OnInit {
  // Inputs
  @Input() editable: boolean = false;
  @Input() enableComments: boolean = false;
  @Input() topicLineItem: TopicLineItem;
  // Output
  @Output() attachmentOnRemove = new EventEmitter();
  constructor(
    public elementRef: ElementRef
  ) { }

  ngOnInit() {
  }
  /**
   * Remove
   * @param $event
   */
  remove($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.elementRef.nativeElement.remove();
  }
}
