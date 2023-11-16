import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Invitation } from '../../../models/invitations/invitation';


@Injectable()
export class TeamWorkflowService {
    // Modal Suspend
    private subjectModalSuspendAccount: Subject<any> = new Subject();
    public subjectModalSuspendAccount$: Observable<any>;
    // Modal eliminate
    private subjectModalEliminateAccount: Subject<any> = new Subject();
    public subjectModalEliminateAccount$: Observable<any>;
    // Modal eliminate customer
    private subjectModalEliminateCustomer: Subject<any> = new Subject();
    public subjectModalEliminateCustomer$: Observable<any>;
    // Modal edit customer
    // Modal eliminate customer
    private subjectModalEditCustomer: Subject<any> = new Subject();
    public subjectModalEditCustomer$: Observable<any>;

    // Modal eliminate customer
    private subjectModalEliminateInvitation: Subject<any> = new Subject();
    public subjectModalEliminateInvitation$: Observable<any>;


    constructor() {
        this.subjectModalSuspendAccount$ = this.subjectModalSuspendAccount.asObservable();
        this.subjectModalEliminateAccount$ = this.subjectModalEliminateAccount.asObservable();
        this.subjectModalEliminateCustomer$ = this.subjectModalEliminateCustomer.asObservable();
        this.subjectModalEditCustomer$ = this.subjectModalEditCustomer.asObservable();
        this.subjectModalEliminateInvitation$ = this.subjectModalEliminateInvitation.asObservable();
    }
    /**
     * Suspend account
     * @param user
     * @param group
     */
    public suspendAccount(workspaceAccess: WorkspaceAccess) {
        this.subjectModalSuspendAccount.next(Object.assign({}, workspaceAccess));
    }
    /**
     * Eliminate account
     * @param user
     * @param group
     */
    public eliminateAccount(workspaceAccess: WorkspaceAccess) {
        this.subjectModalEliminateAccount.next(Object.assign({}, workspaceAccess));
    }
    
    /**
     * Eliminate invitation
     * @param invitaton
     */
    public eliminateInvitation(invitaton: Invitation) {
        this.subjectModalEliminateInvitation.next(Object.assign({}, invitaton));
    }
}
