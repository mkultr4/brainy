import { Injectable } from '@angular/core';
import { Topic } from 'src/app/models/meeting-note/topic';
import { Observable, Subject } from 'rxjs';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';
import { Task } from 'src/app/models/meeting-note/task';

@Injectable()
export class MeetingNoteWorkflowService {
  // Topic to show
  private _topicShow: Subject<Topic> = new Subject();
  public topicShow: Observable<Topic>;
  // Topic Left sidenav
  private _topicUpdateTitle: Subject<any> = new Subject();
  public topicUpdateTitle: Observable<any>;
  // Remove sub topic sidenav
  private _subTopicRemove: Subject<TopicLineItem> = new Subject();
  public subTopicRemove: Observable<TopicLineItem>;
  // Edit task
  private _editTask: Subject<TopicLineItem> = new Subject();
  public editTask: Observable<TopicLineItem>;
  // Check meeting note status
  private _checkMeetingNoteStatus: Subject<any> = new Subject();
  public checkMeetingNoteStatus: Observable<any>;
  constructor() {
    this.topicShow = this._topicShow.asObservable();
    this.topicUpdateTitle = this._topicUpdateTitle.asObservable();
    this.subTopicRemove = this._subTopicRemove.asObservable();
    this.editTask = this._editTask.asObservable();
    this.checkMeetingNoteStatus = this._checkMeetingNoteStatus.asObservable();
  }
  /**
   * Topic show
   * @param topic
   */
  showTopic(topic: Topic) {
    console.log('show', topic);
    this._topicShow.next(Object.assign(new Topic(), topic));
  }
  /**
   * When update title from left sidenav topic
   * @param title
   */
  updateTopicTitle(title: any) {
    this._topicUpdateTitle.next(title);
  }
  /**
   * Remove sub topic
   */
  removeSubTopic(topicItem: TopicLineItem) {
    this._subTopicRemove.next(Object.assign(new TopicLineItem(), topicItem));

  }
  /**
   * Edit task
   * @param task
   */
  openModalEditTask(topicLineItem: TopicLineItem) {
    this._editTask.next(Object.assign(new TopicLineItem(), topicLineItem));
  }

  // Check meeting note status
  checkStatus(data: any) {
    this._checkMeetingNoteStatus.next(data);
  }


}
