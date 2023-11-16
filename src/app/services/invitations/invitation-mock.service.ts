import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Invitation } from '../../models/invitations/invitation';
import { ROLES_PERMISSIONS } from '../../data/mock-roles';
import { INVITATIONS_CORE, INVITATIONS_EXAMPLE, NEW_INVITATION } from '../../data/mock-invitations';

@Injectable()
export class InvitationMockService extends BaseService {
  invitations: Observable<Invitation[]>;
  private _invitations: BehaviorSubject<Invitation[]>;

  private dataStore: {
    invitations: Invitation[]
  };

  constructor() {
    super();
    this.dataStore = { invitations: [] };
    this._invitations = <BehaviorSubject<Invitation[]>>new BehaviorSubject([]);
    this.invitations = this._invitations.asObservable();
  }
  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }


  loadAll(levelId?: string, referenceId?: string, empty?: boolean) {

    const observable = Observable.create((obs) => {

      if (empty) {
        this.dataStore.invitations = [];
      } else {
        this.dataStore.invitations = INVITATIONS_EXAMPLE;
      }

      this._invitations.next(Object.assign({}, this.dataStore).invitations);
      obs.next(this.dataStore.invitations);

    });
    return observable;
  }

  loadAllNewInvitations(levelId?: string, referenceId?: string, empty?: boolean) {
    const observable = Observable.create((obs) => {
      if (empty) {
        this.dataStore.invitations = [];
      } else {
        this.dataStore.invitations = INVITATIONS_EXAMPLE.filter(i => i.active === false && !i.workspaceAccess);
      }

      this._invitations.next(Object.assign({}, this.dataStore).invitations);
      obs.next(this.dataStore.invitations);

    });
    return observable;
  }

  loadAllCloseCore(levelId?: string, referenceId?: string, guestsBrands = false) {

    const observable = Observable.create((obs) => {
      if (!guestsBrands) {
        obs.next(INVITATIONS_EXAMPLE.filter(i => i.active === true));
      } else if (guestsBrands) {
        const invitations = INVITATIONS_EXAMPLE.filter(i => i.active === true && i.workspaceAccess.rol.key === 'guest').filter(i => i.workspaceAccess.brandCurrentCore);
        invitations.push(INVITATIONS_EXAMPLE.filter(i => i.groupReference === 'editor')[0])
        invitations.push(INVITATIONS_EXAMPLE.filter(i => i.groupReference === 'approver')[0])
        obs.next(invitations);
      }


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
      });
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

  getNewInvitations(userId: string, newInvitation?) {
    if (!newInvitation) {
      return of([])
    } else {
      return of([NEW_INVITATION])
    }
  }
  acceptInvitation(invitationId: string) {
    return of(true);
  }
  cancelInvitation(invitationId: string) {
    return of(true);
  }
}
