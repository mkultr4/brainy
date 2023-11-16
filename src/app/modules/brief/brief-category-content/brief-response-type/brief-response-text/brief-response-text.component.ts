import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: '[app-brief-response-text]',
  templateUrl: './brief-response-text.component.html',
  styleUrls: ['./brief-response-text.component.scss']
})
export class BriefResponseTextComponent implements OnInit {
  public focused = false;
  // Inputs
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() refillable = false;
  @Input() focusResponse = false;
  // Outpus
  @Output() onContentChange = new EventEmitter();
  @Output() onContentFocus = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  changeContent() {
    this.onContentChange.emit(this.briefCategoryItem.responseContent);
  }

  onTextFocus() {
    this.onContentFocus.emit();
    this.focused = true;
  }
  onTextBlur(){
    this.focused = false;
  }

}
