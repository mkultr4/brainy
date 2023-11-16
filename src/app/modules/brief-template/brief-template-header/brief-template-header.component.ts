import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AnimateModalComponent } from '../../shared-modal/animate-modal/animate-modal.component';
import { ModalAssignPermissionComponent } from '../modal-assign-permission/modal-assign-permission.component';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';

@Component({
  selector: 'app-brief-template-header',
  templateUrl: './brief-template-header.component.html',
  styleUrls: ['./brief-template-header.component.scss'],
  providers:[]
})
export class BriefTemplateHeaderComponent implements OnInit {
  // Inputs
  @Input() isAdmin = false;
  // Viewchilds
  @ViewChild('modalAssignPermission')  modalAssignPermission: ModalAssignPermissionComponent;
  // Constructor
  constructor() { }

  ngOnInit() {
  }
  assignPermission(){
    this.modalAssignPermission.showModal();
  }
 

}
