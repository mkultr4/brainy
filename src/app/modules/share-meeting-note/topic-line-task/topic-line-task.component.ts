import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';
import { Task } from 'src/app/models/meeting-note/task';
import { MeetingNoteWorkflowService } from '../../meeting-note/services/meeting-note-workflow.service';

@Component({
  selector: '[app-topic-line-task]',
  templateUrl: './topic-line-task.component.html',
  styleUrls: ['./topic-line-task.component.scss']
})
export class TopicLineTaskComponent implements OnInit {
  // Inputs
  @Input() topicLineItem: TopicLineItem;
  @Input() editable = false;
  @Input() anchor = false;
  @Input() enableComments: boolean = false;
  @Input() withTitle: boolean = true;
  
  // Output
  @Output() taskOnRemove = new EventEmitter();
  constructor(
    public elementRef : ElementRef,
    private _meetingNoteWorkflowService: MeetingNoteWorkflowService
  ) { }

  ngOnInit() {
  }
  // Remove task
  removeTask(task: Task) {
    this.elementRef.nativeElement.remove();
  }

  editTask(){
    this._meetingNoteWorkflowService.openModalEditTask(this.topicLineItem);
  }

}
