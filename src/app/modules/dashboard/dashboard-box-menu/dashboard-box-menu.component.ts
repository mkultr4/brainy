import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MzDropdownBrainyComponent } from '../../shared/mz-dropdown-brainy/mz-dropdown-brainy.component';
import { RolService } from '../../../services/roles/rol.service';

@Component({
  selector: 'app-dashboard-box-menu',
  templateUrl: './dashboard-box-menu.component.html',
  styleUrls: ['./dashboard-box-menu.component.scss']
})
export class DashboardBoxMenuComponent implements OnInit {
  // Public vars
  public isAdmin = false;
  public canCreatePresentation = false;
  public canSearch = false;
  // Input
  @Input() coreId: string;
  @Input() coreTypeKey: string;
  @Input() coreStatusKey: string;
  @Input() workspaceAccessRolKey: string;
  // Outpup
  @Output() menuOnDelete = new EventEmitter();
  @Output() menuOnDownload = new EventEmitter();
  @Output() menuOnArchive = new EventEmitter();
  @Output() menuOnCancel = new EventEmitter();
  @Output() menuOnResume = new EventEmitter();
  @ViewChild('menu') menu: MzDropdownBrainyComponent;
  constructor() {
  }

  ngOnInit() {
    this.isAdmin = RolService.isAdminRol(this.workspaceAccessRolKey);
    this.canCreatePresentation = this.isAdmin && this.coreTypeKey === 'brief' 
    && this.coreStatusKey === 'approved';
    this.canSearch = this.isAdmin && this.coreTypeKey !== 'brief-presentation';
  }
  delete() {
    this.menuOnDelete.emit(true);
  }

  cancelProject() {
    this.menuOnCancel.emit();
  }

  archive() {
    this.menuOnArchive.emit();
  }

  download() {
    this.menuOnDownload.emit();
  }

  resumeProject(){
    this.menuOnResume.emit();
  }


}
