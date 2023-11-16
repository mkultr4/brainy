import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Invitation } from '../../models/invitations/invitation';
import { INVITATIONS_CORE, NEW_INVITATION } from '../../data/mock-invitations';
import { ROLES_PERMISSIONS } from '../../data/mock-roles';
import { SocketService } from '../socket.service';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';

@Injectable()
export class InvitationService  extends SocketService  {
  invitations: Observable<Invitation[]>;
  private _invitations: BehaviorSubject<Invitation[]>;

  private dataStore: {
    invitations: Invitation[]
  };
  constructor() {
    super(environment.urlSocketInvitation);
    this.dataStore = { invitations: [] };
    this._invitations = <BehaviorSubject<Invitation[]>>new BehaviorSubject([]);
    this.invitations = this._invitations.asObservable();
  }

  loadAll(levelId?: string, referenceId?: string, close = false): Observable<Invitation[]> {

    const observable = Observable.create((observer) => {
      if (close) {
        // Only invitations active
        // this.dataStore.invitations = INVITATIONS_CLOSE;
      } else {
        
      }
      this._invitations.next(Object.assign({}, this.dataStore).invitations);
      observer.next(this.dataStore.invitations);
    });

    return observable;
  }

  loadAllByCore(coreId?: number) {

    const observable = new Observable((observer) => {
      // Init data stores
      this.proccessRequest('getInvitationsByCore', coreId ).subscribe((invitations) => {
        this.dataStore.invitations = Object.assign(new Invitation(), invitations);
        //console.log(this.dataStore.invitations);
        this._invitations.next(Object.assign([], this.dataStore).invitations);
        observer.next(this.dataStore.invitations);
      });
    });

    return observable;

  }

  loadAllNewInvitations(levelId?: string, referenceId?: string, empty?: boolean) {
    const observable = Observable.create((obs) => {
      if (empty) {
        this.dataStore.invitations = [];
      } else {
        // this.dataStore.invitations = INVITATIONS_EXAMPLE.filter(i => i.active === false && !i.workspaceAccess);
      }

      this._invitations.next(Object.assign({}, this.dataStore).invitations);
      obs.next(this.dataStore.invitations);

    });
    return observable;
  }
  /**
 * get invitation
 * @param invitation
 */
  getInvitation(invitationId: string) {
    const observable = Observable.create((observer) => {
      const invitation = Object.assign(new Invitation(), INVITATIONS_CORE[0]);
        invitation.permissions = Object.assign([], ROLES_PERMISSIONS);
        observer.next(invitation);
    });
    return observable;

  }
  /**
   * Create invitation
   * @param invitation
   */
  create(invitation: Invitation) {
    const observable = Observable.create((observer) => {
      this.dataStore.invitations.push(invitation);
      this.proccessRequest('createInvitation', { id: invitation.id, data: invitation });
      this._invitations.next(Object.assign([], this.dataStore).invitations);
      observer.next(this.dataStore.invitations);
    });
    return observable;
  }
  /**
   * Create invitation list
   * @param inviationList
   */
  createList(inviationList: Array<Invitation>) {
    const observable = Observable.create((observer) => {
      this.dataStore.invitations = this.dataStore.invitations.concat(inviationList);
      for (const invitation of inviationList) {
        console.log(JSON.stringify(invitation, null, '\t'));
        this.proccessRequest('sendInvitation', invitation);
      }

      setTimeout(() => {
        this._invitations.next(Object.assign([], this.dataStore).invitations);
        observer.next(this.dataStore.invitations);
      }, 900);
    });
    return observable;

  }
  /**
   * Remove invitation
   * @param inviationId
   */
  deleteInvitation(inviationId: string) {
    const observable = Observable.create((observer) => {
      this.dataStore.invitations.forEach((inv, i) => {
        if (inv.id === inviationId) {
          this.dataStore.invitations.splice(i, 1);
        }
      });
      setTimeout(() => {
        this._invitations.next(Object.assign({}, this.dataStore).invitations);
        observer.next(this.dataStore.invitations);
      }, 1500);
    });

    return observable;
  }
  /**
   * Update invitation
   * @param inviation
   */
  updateInvitation(inviation: Invitation) {
    const observable = Observable.create((observer) => {
      this.dataStore.invitations.forEach((inv, i) => {
        if (inv.id === inviation.id) {
          this.dataStore.invitations[i] = Object.assign(new Invitation(), inviation);
        }
      });

      setTimeout(() => {
        this._invitations.next(Object.assign({}, this.dataStore).invitations);
        observer.next(this.dataStore.invitations);
      });
    });
    return observable;
  }

  getNewInvitation(userId: string) {

  }
  acceptInvitation(invitationId: string) {
    console.log(`proccess invitation with id: ${invitationId}`);
    if (invitationId) {
      this.proccessRequest('confirmInvitation', invitationId).subscribe((resultInvitation) => {
          if (resultInvitation) {
            console.log(`result invitation: ${JSON.stringify(resultInvitation)}`);
          }
      });
    }
  }


  
  getNewInvitations(userId: string, newInvitation?) {
    if (!newInvitation) {
      return of([])
    } else {
      return of([NEW_INVITATION])
    }
  }
  
  cancelInvitation(invitationId: string) {
    return of(true);
  }
}
