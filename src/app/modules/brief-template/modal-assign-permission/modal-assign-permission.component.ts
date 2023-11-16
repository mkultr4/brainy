import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { AnimateModalComponent } from '../../shared-modal/animate-modal/animate-modal.component';
import { WorkspaceAccessStrategyService } from 'src/app/services/workspace/workspace-access-strategy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-assign-permission',
  templateUrl: './modal-assign-permission.component.html',
  styleUrls: ['./modal-assign-permission.component.scss']
})
export class ModalAssignPermissionComponent implements OnInit, AfterContentInit {
  // Public vars
  public hasChangePermission = false;
  public btnLoading = false;
  public search = '';
  public workspaceAccesses = [];
  // Services 
  private _workspaceAccessService;
  // View child
  @ViewChild('modal') modal: AnimateModalComponent;
  // Constructor
  constructor(
    private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
    private _toastrService: ToastrService
  ) {
    this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
  }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this._workspaceAccessService.findWorkspaceAccessManagerBriefTemplate().subscribe(workspaceAccesses => {
      console.log(workspaceAccesses);
      this.workspaceAccesses = workspaceAccesses;
    });
  }

  showModal() {
    this.modal.showModal();
  }
  // Modal on show
  modalOnShow() {
  }
  // Modal on hide
  modalOnHide() {
    this.hasChangePermission = false;
    this.btnLoading = false;
    this.search ='';
  }
  // On change permission
  onChangeAccess() {
    this.hasChangePermission = true;
  }
  // Change search
  changeSearch( search){
    this.search = search;
  }
  // Save
  save() {
    this.btnLoading = true;
    this._workspaceAccessService.updatePermissionWorkspaceAccess(this.workspaceAccesses).subscribe(resp => {
      this.btnLoading = false;
      this.hasChangePermission = false;
      this._toastrService.info('Haz permitido el acceso a la galería de templates.');
    });
  }

}
