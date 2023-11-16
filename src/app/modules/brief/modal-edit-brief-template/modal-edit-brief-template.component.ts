import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { User } from 'src/app/models/users/user';
import { MzModalComponent } from 'ngx-materialize';
import { Router } from '@angular/router';
import { RoutingStateService } from 'src/app/services/routing-state.service';

@Component({
  selector: 'app-modal-edit-brief-template',
  templateUrl: './modal-edit-brief-template.component.html',
  styleUrls: ['./modal-edit-brief-template.component.scss']
})
export class ModalEditBriefTemplateComponent implements OnInit {
  public modalOptions: Materialize.ModalOptions = {
    opacity: 0,
    endingTop: '50%',
    dismissible: false,
    ready: () => {    
    },
    complete: () => { }
  };
  
  // Inputs
  @Input() briefTemplate: BriefTemplate;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() currentUser: User;
  // View child
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(
    private _router:Router,
    private _routingStateService:RoutingStateService
  ) {
    

    
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    // Brands 
  }
  openModal() {
    this.modal.openModal();
  }
  closeModal() {
    this.modal.closeModal();
  }
  goBack() {
    if(this._routingStateService.getPreviousUrl().includes('dashboard')){
      this._router.navigate(['/dashboard'], { queryParams: { rolKey: this.workspaceAccess.rol.key } });
    }else{
      this._router.navigate(['/brief-templates'], { queryParams: { rolKey: this.workspaceAccess.rol.key } });
    }
  }
}
