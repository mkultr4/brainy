import { Component, OnInit, Input, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from '../../../../environments/environment';

import {
  NOTIFICATION_REQUEST_EDIT_FEEDBACK, NOTIFICATION_PERMISSION_ACCEPTED_FEEDBACK, NOTIFICATION_REQUEST_PERMISSION_FEEDBACK, NOTIFICATION_REQUEST_EDIT_MEETING, NOTIFICATION_REQUEST_PERMISSION_MEETING, NOTIFICATION_PERMISSION_ACCEPTED_MEETING, NOTIFICATION_BRIEF_FILLED, NOTIFICATION_BRIEF_GIVEBACK, NOTIFICATION_REQUEST_EDIT_BRIEF, NOTIFICATION_PERMISSION_ACCEPTED_BRIEF, NOTIFICATION_REQUEST_PERMISSION_BRIEF, NOTIFICATION_REQUEST_EDIT_PITCH, NOTIFICATION_PERMISSION_ACCEPTED_PITCH, NOTIFICATION_REQUEST_PERMISSION_PITCH
} from '../../../data/mock-notifications';
import { Notification } from '../../../models/notifications/notification';
import { NotificationStrategyService } from '../../../services/notifications/notification-strategy.service';

@Component({
  selector: 'app-sidenav-notifications,[app-sidenav-notifications]',
  templateUrl: './sidenav-notifications.component.html',
  styleUrls: ['./sidenav-notifications.component.scss'],
  providers: []
})
export class SidenavNotificationsComponent implements OnInit, AfterViewInit, OnDestroy {

  public notifications: Array<Notification>;
  public unreadMessages = 0;
  public queryParams;
  // Services
  private _notificationService;
  // Subscription
  public subscriptionQueryParams: ISubscription;
  public subscriptionNotifications: ISubscription;
  @Input() empty = false;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _notificationStrategyService: NotificationStrategyService
  ) {
    this._notificationService = this._notificationStrategyService.getService();
    this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;

    });
  }

  ngOnInit() {
    this._notificationService.loadAll(this.empty).subscribe((notifications) => {

    });
    this.subscriptionNotifications =
      this._notificationService.notifications.subscribe(notifications => {
        console.log(notifications);
        this.notifications = notifications;
        // Implemention only design
        if (environment.envName === 'design') {
          // Feedback
          if (this.queryParams.soliciteModificationFeedback) {
            this.notifications.unshift(NOTIFICATION_REQUEST_EDIT_FEEDBACK);
          }
          if (this.queryParams.solicitePermissionAcceptedFeedback) {
            this.notifications.unshift(NOTIFICATION_PERMISSION_ACCEPTED_FEEDBACK);
          }
          if (this.queryParams.solicitePermissionFeedback) {
            this.notifications.unshift(NOTIFICATION_REQUEST_PERMISSION_FEEDBACK);
          }
          // Meeting note
          if (this.queryParams.soliciteModificationMeetingNote) {
            this.notifications.unshift(NOTIFICATION_REQUEST_EDIT_MEETING);
          }
          if (this.queryParams.solicitePermissionAcceptedMeetingNote) {
            this.notifications.unshift(NOTIFICATION_PERMISSION_ACCEPTED_MEETING);
          }
          if (this.queryParams.solicitePermissionMeetingNote) {
            this.notifications.unshift(NOTIFICATION_REQUEST_PERMISSION_MEETING);
          }
          // Brief
          if (this.queryParams.notificationBriefFilled) {
            this.notifications.unshift(NOTIFICATION_BRIEF_FILLED);
          }
          if (this.queryParams.notificationBriefGiveback) {
            this.notifications.unshift(NOTIFICATION_BRIEF_GIVEBACK);
          }
          // Brief flow re open
          if (this.queryParams.soliciteModificationBrief) {
            this.notifications.unshift(NOTIFICATION_REQUEST_EDIT_BRIEF);
          }
          if (this.queryParams.solicitePermissionAcceptedBrief) {
            this.notifications.unshift(NOTIFICATION_PERMISSION_ACCEPTED_BRIEF);
          }
          if (this.queryParams.solicitePermissionBrief) {
            this.notifications.unshift(NOTIFICATION_REQUEST_PERMISSION_BRIEF);
          }
          // Pitch re open
          if (this.queryParams.soliciteModificationPitch) {
            this.notifications.unshift(NOTIFICATION_REQUEST_EDIT_PITCH);
          }
          if (this.queryParams.solicitePermissionAcceptedPitch) {
            this.notifications.unshift(NOTIFICATION_PERMISSION_ACCEPTED_PITCH);
          }
          if (this.queryParams.solicitePermissionPitch) {
            this.notifications.unshift(NOTIFICATION_REQUEST_PERMISSION_PITCH);
          }
        }
        this.unreadMessages = this.notifications.filter(notification => notification.read === false).length;
      });
  }
  ngAfterViewInit() {

  }

  markRead(notification: Notification) {
    console.log(notification);
    this._notificationService.markReadNotification(notification.id).subscribe();
  }
  ngOnDestroy() {
    if (this.subscriptionNotifications) {
      this.subscriptionNotifications.unsubscribe();
    }
  }

}
