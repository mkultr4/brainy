import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { UtilService } from 'src/app/services/utils/util.service';
import { Topic } from 'src/app/models/meeting-note/topic';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';


@Component({
  selector: 'app-sub-topic-item',
  templateUrl: './sub-topic-item.component.html',
  styleUrls: ['./sub-topic-item.component.scss']
})
export class SubTopicItemComponent implements OnInit {
  public iEditable = false;
  public topicLineTextEmpty = `<span><br></span>`
  public topicLineTextEmpty2 = `<br>`
  // Input
  @Input() item: TopicLineItem;
  @Input() topicShow: Topic;
  @Input() editable;
  @Input() visible = true;
  // Outputs
  @Output() subTopicOnUpdate = new EventEmitter();
  @Output() subTopicOnRemove = new EventEmitter();
  @Output() subTopicClick = new EventEmitter();
  // View child
  @ViewChild('editor') editor: ElementRef;
  constructor(
    private _utilService: UtilService
  ) { }

  ngOnInit() {
  }
  /**
   * On change sub topic
   * @param content 
   */
  onChangeSubTopic(content) {

  }
  /**
   * Remove subtopic
   */
  removeTopic() {
    if (this.topicShow.id === this.item.idTopic) {
      console.log('remove');
      $(`#${this.item.id}`).remove();
    } else {
      this.subTopicOnRemove.emit(this.item);
    }
  }

  editTitle() {
    this.iEditable = true;
    this.gotToSubTopic();
    setTimeout(() => {
      this.placeCaretAtEnd(this.editor.nativeElement);
    });
  }
  blurEditor() {
    setTimeout(() => {
      this.iEditable = false;
      let content = this.item.content.text;
      if (content === '') {
        content = '<span><br></span>';
      }
      if (this.topicShow.id === this.item.idTopic) {
        const line = document.getElementById(this.item.id);
        console.log(line);
        line.innerHTML = content;
      } else {
        this.item.content.text = content;
        this.subTopicOnUpdate.emit(this.item);
      }

    });
  }
  // Focus last character
  placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
      && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  gotToSubTopic() {
    this.subTopicClick.emit();
    const timeout = this.topicShow.id === this.item.idTopic ? 0 : 300;
    setTimeout(() => {
      const line = $(`#${this.item.id}`);
      const scrollParent = this._utilService.getScrollParent(line.get(0), true);
      this._utilService.scrollTo(scrollParent, line.get(0));
    }, timeout);
  }
}
