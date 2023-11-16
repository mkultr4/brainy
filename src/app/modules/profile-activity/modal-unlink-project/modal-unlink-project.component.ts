  import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Core } from '../../../models/cores/core';
import { MzModalComponent } from 'ngx-materialize';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-unlink-project',
  templateUrl: './modal-unlink-project.component.html',
  styleUrls: ['./modal-unlink-project.component.scss']
})
export class ModalUnlinkProjectComponent implements OnInit {
  public core: Core;
  public workspaceAccess: WorkspaceAccess;
  public unlinkCore = false;
  public unlinkProject = false;
  public unlinkBrand = false;
  public btnDisabled = false;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    // ready: (modal, trigger) => },
    complete: () => {
      console.log('DENTRO DEL COMPLETE');
      this.unlinkCore = false;
      this.unlinkProject = false;
      this.unlinkBrand = false;
      this.btnDisabled = false;
    }
  };
  // Services
  private _workspaceAccessService;
  // Output
  @Output() modalOnUnlink = new EventEmitter();
  // View child
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(
    private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
    private _toastrService: ToastrService
  ) {
    this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
  }

  ngOnInit() {
  }
  openModal(core: Core, workspaceAccess: WorkspaceAccess) {
    console.log("OPEN MODAL");
    this.core = core;
    this.workspaceAccess = workspaceAccess;
    this.modal.openModal();

  }
linkBrand(){
  console.log('DENTRO DE LINKBRAND');
  this.unlinkProject = true;
  this.unlinkCore = true;

  
  if(this.unlinkBrand === true){
    this.unlinkProject = false;
    this.unlinkCore = false;
  }
}
linkProject(){
  console.log('DENTRO DE linkProject');
  this.unlinkBrand = false;
  this.unlinkCore = true;

  
  if(this.unlinkProject === true){
    
    this.unlinkCore = false;
  }
}
linkCore(){
  console.log('DENTRO DE linkProject');
}
  unlink() {
console.log('DENTRO DE UNLIK');
    this.btnDisabled = true;
    this._workspaceAccessService
      .unlinkCore(this.workspaceAccess, this.core, this.unlinkCore, this.unlinkProject, this.unlinkBrand).subscribe((result) => {

        this.btnDisabled = false;
        this._toastrService.info('Proyectos desvinculados correctamente');
        this.modalOnUnlink.emit(result);
        this.modal.closeModal();
      });
  }

}
