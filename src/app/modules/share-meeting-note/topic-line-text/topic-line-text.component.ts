import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: '[app-topic-line-text]',
  templateUrl: './topic-line-text.component.html',
  styleUrls: ['./topic-line-text.component.scss']
})
export class TopicLineTextComponent implements OnInit {
  @Input() editable = false;
  @Input() enableComments = false;
  constructor(
    public elementRef: ElementRef
  ) { }

  ngOnInit() {

  }
  ngAfterContentInit() {

  }

}
