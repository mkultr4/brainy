import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';
import { Invitation } from '../../../models/invitations/invitation';
import { ToastrService } from 'ngx-toastr';
import { RolStrategyService } from '../../../services/roles/rol-strategy.service';
import { Rol } from '../../../models/workspace/rol';
import { ModalTeamEliminateInvitationComponent } from '../../shared-team/modal-team-eliminate-invitation/modal-team-eliminate-invitation.component';
import { TeamWorkflowService } from '../../shared-team/services/team-workflow.service';
@Component({
    selector: 'app-profile-invitation-account',
    templateUrl: './profile-invitation-account.component.html',
    styleUrls: ['./profile-invitation-account.component.scss']
})
export class ProfileInvitationAccountComponent implements OnInit, OnDestroy {
    public invitation: Invitation;
    public roles: Array<Rol>;
    // Subscriptions
    subscriptionParams: ISubscription;
    // Services
    private _rolService;
    private _invitationService;
    // View child
    @ViewChild('modaEliminate') modaEliminate: ModalTeamEliminateInvitationComponent;

    constructor(
        private _router: Router,
        private _ativatedRoute: ActivatedRoute,
        private _invitationStrategyService: InvitationStrategyService,
        private _toastrService: ToastrService,
        private _rolStrategyService: RolStrategyService,
        private _teamWorkflowService: TeamWorkflowService,
    ) {
        this._rolService = this._rolStrategyService.getService();
        this._invitationService = this._invitationStrategyService.getService();
        this.subscriptionParams = this._ativatedRoute.parent.params.subscribe(params => {
            const paramId = params.id;
            console.log(paramId);
            this._invitationService.getInvitation(paramId).subscribe(invitation => {
                console.log(invitation);
                this.invitation = invitation;
            });
            // Roles
            this._rolService.getAllRoles().subscribe(roles => {
                this.roles = roles;
            });


        });
    }

    ngOnInit() {
    }
    eliminate() {
        // this.modaEliminate.openModal();
        this._teamWorkflowService.eliminateInvitation(this.invitation);
    }

    save() {
        this._invitationService.updateInvitation(this.invitation).subscribe(() => {
            this._toastrService.info('Se han actualizado correctamente los cambios');
        });
    }
    modalOnEliminate(invitation: Invitation) {
        this._router.navigate(['/team']);
    }
    ngOnDestroy() {
        if (this.subscriptionParams) {
            this.subscriptionParams.unsubscribe();
        }
    }
}
