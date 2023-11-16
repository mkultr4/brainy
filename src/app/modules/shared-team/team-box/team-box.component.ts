import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { MzDropdownBrainyComponent } from '../../shared/mz-dropdown-brainy/mz-dropdown-brainy.component';
import { TeamWorkflowService } from '../services/team-workflow.service';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-team-box,[app-team-box]',
  templateUrl: './team-box.component.html',
  styleUrls: ['./team-box.component.scss']
})
export class TeamBoxComponent implements OnInit {
  // Public
  public group = 'team';
  // Services 
  private _workspaceAccessService;
  // Input
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() currentWorkspaceAccessId: string;
  // Outputs
  @Output() boxOnSuspend = new EventEmitter();
  @Output() boxOnEliminate = new EventEmitter();
  // View child
  @ViewChild('menu', { read: MzDropdownBrainyComponent }) menu: MzDropdownBrainyComponent;


  constructor(
    private _teamWorkflowService: TeamWorkflowService,
    private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {
    this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
  }

  ngOnInit() {



  }

  suspend($event) {
    setTimeout(() => {
      if (this.workspaceAccess.accountStatus.key !== 'suspended') {
        // this.onSuspend.emit(this.user);
        this._teamWorkflowService.suspendAccount(this.workspaceAccess);
      }
    });
  }
  eliminate($event) {

    if (this.workspaceAccess.accountStatus.key !== 'eliminated') {
      // this.onSuspend.emit(this.user);
      this._teamWorkflowService.eliminateAccount(this.workspaceAccess);
    }
  }

  activate($event) {

    if (this.workspaceAccess.accountStatus.key !== 'active') {

      this._workspaceAccessService.activateWorkspaceAccess(this.workspaceAccess).subscribe(response => {
        this._toastrService.info('Cuenta activada');
      });
    }
  }
  /**View profile */
  viewProfile() {
  
  if(this.currentWorkspaceAccessId !== undefined && this.workspaceAccess.id !== undefined){

    if (this.currentWorkspaceAccessId !== this.workspaceAccess.id)   {
      this._router.navigate(['/profile/', this.workspaceAccess.id]);
    }else{
      this._router.navigate(['/profile/user']);
  
    }
  }
   
  }

  mouseleave() {
    this.menu.close();
  }


}
