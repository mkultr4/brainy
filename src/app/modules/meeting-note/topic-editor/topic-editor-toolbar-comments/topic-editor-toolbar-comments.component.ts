import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-topic-editor-toolbar-comments',
  templateUrl: './topic-editor-toolbar-comments.component.html',
  styleUrls: ['./topic-editor-toolbar-comments.component.scss']
})
export class TopicEditorToolbarCommentsComponent implements OnInit {
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
