import { Injectable } from '@angular/core';
import { NOTIFICATIONS } from '../../data/mock-notifications';
import { Notification } from '../../models/notifications/notification';
import * as moment from 'moment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { SocketService } from '../socket.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/users/user';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends SocketService {


  public notifications: Observable<Notification[]>;
  private _notifications;
  private dataStore;
  
  constructor() {
    super(environment.urlNotification);
  
    this._notifications = new BehaviorSubject<Notification[]>([]);
    this.notifications = this._notifications.asObservable();
    this.dataStore = {
      notifications: []
    };
  }

  loadAll(empty = false) {
    const observable = Observable.create((observer) => {

      const user = <User>JSON.parse(localStorage.getItem('currentUser'));
      this.proccessRequest('getNotificationsByUserDestination', user.id).subscribe((not) => {
        console.log('notifications', not);
        this.dataStore.notifications = not;
        this._notifications.next(Object.assign([], this.dataStore).notifications);
        observer.next(this.dataStore.notifications);
      });
      
    });
    return observable;
  }

  getCountUnreadNotifications() {

    const count = this.dataStore.notifications.filter(not => not.read === false).length;
    console.log(count);
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
    for( const not of this.dataStore.notifications) {
      if (not.id === notificationId) {
        not.read = true;
        
        this.proccessRequest('markRead', notificationId);
        this._notifications.next(Object.assign([], this.dataStore).notifications);
      }
    }
    return new Observable((observer) => {
      observer.next(notificationId);
    });
  }
  getNotifications(
    userId: string,
    referenceId: string,
    referenceType: string,
    requestEdition?: boolean,
    requestPermission?: boolean
  ): Observable<Notification[]> {

    return new Observable((observer) => {
      const notifications = new Array<Notification>();
      if (requestEdition) {
        // notifications.push(NOTIFICATION_REQUEST_EDIT_FEEDBACK);
      }
      if (requestPermission) {
        // notifications.push(NOTIFICATION_REQUEST_PERMISSION_FEEDBACK);
      }
      observer.next(notifications);
    });

  }

  addNotification(notification: any) {
    console.log('addNotification', notification.data);
    this.dataStore.notifications.push(JSON.parse(notification.data.str));
    this._notifications.next(Object.assign([],this.dataStore.notifications));
  }
}
