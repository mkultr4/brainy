import { Injectable } from '@angular/core';
import { NOTIFICATIONS, NOTIFICATION_REQUEST_EDIT_FEEDBACK, NOTIFICATION_REQUEST_PERMISSION_FEEDBACK, NOTIFICATION_REQUEST_EDIT_MEETING, NOTIFICATION_REQUEST_PERMISSION_MEETING, NOTIFICATION_REQUEST_EDIT_BRIEF, NOTIFICATION_REQUEST_PERMISSION_BRIEF } from '../../data/mock-notifications';
import { Notification } from '../../models/notifications/notification';
import * as moment from 'moment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { BaseService } from '../base.service';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class NotificationMockService extends BaseService {

  public notifications: Observable<Notification[]>;
  private _notifications = new BehaviorSubject<Notification[]>([]);
  private dataStore = {
    notifications: []
  };

  constructor() {
    super();
    this.notifications = this._notifications.asObservable();
  }
  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }

  loadAll(empty = false) {
    const observable = Observable.create((observer) => {
      let not = _.cloneDeep(NOTIFICATIONS);

      if (empty) {
        not = [];
      }
      this.dataStore.notifications = not;
      this._notifications.next(Object.assign([], this.dataStore).notifications);
      observer.next(this.dataStore.notifications);
    });
    return observable;
  }

  getCountUnreadNotifications() {

    const count = NOTIFICATIONS.filter(not => not.read === false).length;
    return new Observable((observer) => {
      setTimeout(() => { observer.next(count); }, 2000);
    });

  }
  getAllPerDay(notifications: Array<Notification>) {
    const all: Array<Notification> = notifications;
    const dateMap = all.reduce((m, v) => {
      const day = moment(v.createDate).format('YYYY-M-DD');
      const entry = m[day];
      if (typeof entry === 'undefined') {
        m[day] = [v];
      } else {
        entry.push(v);
      }
      return m;
    }, {});

    const res = Object.keys(dateMap).map(function (d) {
      return {
        day: d,
        notifications: dateMap[d].sort((a, b) => {
          return moment(a.createDate).toDate().getTime() - moment(b.createDate).toDate().getTime();
        })
      };
    });
    res.sort(function (a, b) { return moment(b.day).toDate().getTime() - moment(a.day).toDate().getTime(); });

    return res;
  }
  /**
   * Mark read notification
   * @param notificationId
   */
  markReadNotification(notificationId: string) {
    return new Observable((observer) => {
      observer.next(notificationId);
    });
  }
  /**
   * Mark read alert notification
   * @param notificationId
   */
  markReadAlertNotification(notificationId: string) {
    return new Observable((observer) => {
      observer.next(notificationId);
    });
  }
  /**
   * Get notifications
   * @param userId 
   * @param referenceId 
   * @param referenceType 
   * @param requestEdition 
   * @param requestPermission 
   */
  getNotifications(userId: string, referenceId: string, referenceType: string,
    requestEdition?: boolean, requestPermission?: boolean): Observable<Notification[]> {

    return new Observable((observer) => {
      const notifications = new Array<Notification>();
      if (referenceType === 'feedback') {
        if (requestEdition) {
          notifications.push(NOTIFICATION_REQUEST_EDIT_FEEDBACK);
        }
        if (requestPermission) {
          notifications.push(NOTIFICATION_REQUEST_PERMISSION_FEEDBACK);
        }
      }
      if (referenceType === 'meeting-note') {
        if (requestEdition) {
          notifications.push(NOTIFICATION_REQUEST_EDIT_MEETING);
        }
        if (requestPermission) {
          notifications.push(NOTIFICATION_REQUEST_PERMISSION_MEETING);
        }
      }
      if (referenceType === 'brief') {
        if (requestEdition) {
          notifications.push(NOTIFICATION_REQUEST_EDIT_BRIEF);
        }
        if (requestPermission) {
          notifications.push(NOTIFICATION_REQUEST_PERMISSION_BRIEF);
        }
      }
      observer.next(notifications);
    });

  }

}
