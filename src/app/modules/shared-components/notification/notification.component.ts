import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Notification } from '../../../models/notifications/notification';
import { Feedback } from '../../../models/feedback/feedback';
import { Brief } from 'src/app/models/brief/brief';
import { MeetingNote } from 'src/app/models/meeting-note/meeting-note';

@Component({
  selector: 'app-notification,[app-notification]',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public hour = '';
  @Input() public notification: Notification;
  @Output() notificationOnMarkRead = new EventEmitter();
  constructor(private _router: Router) { }

  ngOnInit() {

  }
  @HostListener('click')
  click() {
    if (this.notification.level.key === 'feedback') {
      const feedback = <Feedback>this.notification.referenceObject;
      if (feedback.status.key === 'approved') {
        this._router.navigate(['/feedback/close', feedback.id], { queryParams: this.notification.queryParams })
      } else {
        this._router.navigate(['/feedback', feedback.id], { queryParams: this.notification.queryParams })
      }
    }
    if (this.notification.level.key === 'meeting-note') {
      const meetingNote = <MeetingNote>this.notification.referenceObject;
      if (meetingNote.status.key === 'approved') {
        this._router.navigate(['/meeting-note/close', meetingNote.id], { queryParams: this.notification.queryParams })
      } else {
        this._router.navigate(['/meeting-note', meetingNote.id], { queryParams: this.notification.queryParams })
      }
    }
    if (this.notification.level.key === 'brief') {

      const brief = <Brief>this.notification.referenceObject;
      if (brief.template.typeTemplate.key === 'brief') {
        if (brief.status.key === 'approved') {
          this._router.navigate(['/brief/close', brief.id], { queryParams: this.notification.queryParams })
        } else {
          this._router.navigate(['/brief/project', brief.id], { queryParams: this.notification.queryParams })
        }
      }
      else if (brief.template.typeTemplate.key === 'pitch') {
        if (brief.status.key === 'approved') {
          this._router.navigate(['/brief/close', brief.id], { queryParams: this.notification.queryParams})
        } else {
          this._router.navigate(['/brief/project/pitch', brief.id], { queryParams: this.notification.queryParams })
        }
      }
    }
    this.notificationOnMarkRead.emit(this.notification);
  }

}
