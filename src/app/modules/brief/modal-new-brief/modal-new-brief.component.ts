import { Component, OnInit, ElementRef, ViewChild, Input, AfterContentInit } from '@angular/core';
import { Project } from '../../../models/projects/project';
import { Brand } from '../../../models/brands/brand';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { ProjectStrategyService } from '../../../services/projects/project-strategy.service';
import { BrandStrategyService } from '../../../services/brands/brand-strategy.service';
import { NgForm } from '@angular/forms';
import { MzModalComponent } from 'ngx-materialize';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Core } from '../../../models/cores/core';
import { NewBriefFormComponent } from './new-brief-form/new-brief-form.component';
import { User } from 'src/app/models/users/user';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { RoutingStateService } from 'src/app/services/routing-state.service';

@Component({
  selector: 'app-modal-new-brief',
  templateUrl: './modal-new-brief.component.html',
  styleUrls: ['./modal-new-brief.component.scss']
})
export class ModalNewBriefComponent implements OnInit, AfterContentInit {
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
  @ViewChild(NewBriefFormComponent) newBriefFormComponent: NewBriefFormComponent;
  constructor(
    private _router: Router,
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
