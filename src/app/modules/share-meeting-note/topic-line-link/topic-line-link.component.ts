import { Component, OnInit, Input, Output, ElementRef, EventEmitter, HostBinding } from '@angular/core';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';


@Component({
  selector: '[app-topic-line-link]',
  templateUrl: './topic-line-link.component.html',
  styleUrls: ['./topic-line-link.component.scss']
})
export class TopicLineLinkComponent implements OnInit {
  
  // Inputs
  @HostBinding('class.editable') @Input() editable: boolean = false;
  @Input() topicLineItem: TopicLineItem;
  @Input() enableComments  = false;
  // Outputs
  @Output() linkOnRemove = new EventEmitter();

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
