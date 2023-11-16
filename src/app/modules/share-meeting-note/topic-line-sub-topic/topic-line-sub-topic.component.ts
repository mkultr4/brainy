import { Component, OnInit, Input, ElementRef } from '@angular/core';


@Component({
  selector: 'app-topic-line-sub-topic',
  templateUrl: './topic-line-sub-topic.component.html',
  styleUrls: ['./topic-line-sub-topic.component.scss']
})
export class TopicLineSubTopicComponent implements OnInit {

  // Inputs
  @Input() editable: boolean = false;
  @Input() enableComments: boolean = false;
  constructor(public elementRef: ElementRef) {

  }
  ngOnInit() {

  }

}
