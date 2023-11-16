import { Injectable } from '@angular/core';
import { USERS, USER_CONNECTION_STATUSES } from '../../data/mock-users';
import { User } from '../../models/users/user';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { RECOMMENDATIONS } from '../../data/mock-recomendations';
import { ACCOUNTS } from '../../data/mock-account';

@Injectable({
  providedIn: 'root'
})
export class UserMockService extends BaseService {

  constructor() {
    super();
  }

  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getById(id: any) {
    return of(USERS.filter(u => u.id === id)[0]);
  }
  getByIdMock(id): User {
    return USERS.filter(u => u.id === id)[0];
  }
  getUserStatuses() {
    const observable: Observable<string[]> = new Observable((obs) => {
      obs.next(USER_CONNECTION_STATUSES);
    });
    return observable;
  }
  setStatusconnection(user: User, status: string): Observable<any> {
    const observable: Observable<string> = new Observable((obs) => {
      console.log('setting status', user.id);
      obs.next(status);
    });
    return observable;
  }

  changephotoUrl(user: User, file: File): Observable<any> {
    const observable: Observable<any> = new Observable((obs) => {
      obs.next(true);
    });
    return observable;
  }
  finishTour(userId: any) {
    return of(new User());
  }

  updateUser(user: User) {
    return of(user);
  }
  resetPassword(userId: any, newPassowrd) {
    return of({ userId: userId });
  }
  getRecommendations(userId: any) {
    return of(RECOMMENDATIONS);
  }
  getAccount(originAccount) {
    return of(ACCOUNTS[0]);
  }
  requestResetPassword(userId: string) {
    return of(true);
  }
}
