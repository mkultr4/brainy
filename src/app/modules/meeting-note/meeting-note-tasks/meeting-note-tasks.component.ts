import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Task } from 'src/app/models/meeting-note/task';
import { MeetingNoteStrategyService } from 'src/app/services/meeting-note/meeting-note-strategy.service';
import { Topic } from 'src/app/models/meeting-note/topic';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';

@Component({
  selector: 'app-meeting-note-tasks',
  templateUrl: './meeting-note-tasks.component.html',
  styleUrls: ['./meeting-note-tasks.component.scss']
})
export class MeetingNoteTasksComponent implements OnInit, OnChanges {
  // Public vars
  public tasks: TopicLineItem[];
  // Inputs
  @Input() topics;
  @Input() editable;
  // Sevices
  private _meetingNoteService;
  constructor(
    private _meetingNoteStrategyService: MeetingNoteStrategyService
  ) {
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
  }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.topics) {
      this.tasks = [];
      this.topics.forEach((t: Topic) => {
        const tasksDescriptions = t.descriptionItems.filter(i => i.type === 'task');
        const tasksAgreements = t.agreementItems.filter(i => i.type === 'task');
        this.tasks = this.tasks.concat(...tasksDescriptions, ...tasksAgreements);
        console.log(this.tasks);
      });
    }
  }


}



