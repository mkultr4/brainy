import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AsidenavComponent } from '../../shared-sidenav/asidenav/asidenav.component';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import * as _ from 'lodash';
import { Giveback } from 'src/app/models/brief/giveback';
@Component({
  selector: 'app-brief-givebacks-sidenav',
  templateUrl: './brief-givebacks-sidenav.component.html',
  styleUrls: ['./brief-givebacks-sidenav.component.scss']
})
export class BriefGivebacksSidenavComponent implements OnInit {
  // Public vars
  public briefCategoryItem: BriefCategoryItem;
  public giveback: Giveback;
  public categoryTitle: string;
  public subcategoryTitle: string;
  public showMenu = false;
  public message = '';
  public reply = '';
  public _workspaceAccess: WorkspaceAccess;
  public editable = false;
  // Services.
  private _briefService;
  // Input
  @Input() set workspaceAccess(workspaceAccess: WorkspaceAccess) {
    this._workspaceAccess = workspaceAccess;
    this.editable = this._workspaceAccess.groupReference === 'aprover' || 
    this._workspaceAccess.groupReference === 'editor';
  };
  // Outpus
  @Output() onShowSidenavGiveback = new EventEmitter();
  @Output() onUpdateGiveback = new EventEmitter();
  // Viewchilds
  @ViewChild('briefGivebacksSidenav') briefGivebacksSidenav: AsidenavComponent;
  // Constructor
  constructor(
    private _briefStrategyService: BriefStrategyService
  ) {
    this._briefService = this._briefStrategyService.getService();

  }
  // On init
  ngOnInit() {
  }
  // On show
  onShow() {
    this.onShowSidenavGiveback.emit(true);
  }
  // On hide
  onHide() {
    this.briefCategoryItem = undefined;
    this.giveback = undefined;
    this.message = '';
    this.reply = '';
    this.categoryTitle = undefined;
    this.subcategoryTitle = undefined;
    this.onShowSidenavGiveback.emit(false);

  }
  // Show sidenav
  showSidenav(giveback: Giveback, briefCategoryItem: BriefCategoryItem) {
    this.briefCategoryItem = briefCategoryItem;
    this.giveback = giveback;
    this.categoryTitle = this.giveback.categoryTitle;
    this.subcategoryTitle = this.giveback.subCategoryTitle;
    this.briefGivebacksSidenav.showSidenav();
    setTimeout(() => {
      this.message = this.giveback.message;
      this.reply = this.giveback.reply;
    }, 100);
  }
  // Close sidenav
  closeSidenav() {
    this.briefGivebacksSidenav.hideSidenav();
  }
  // Update giveback
  givebackUpdate(giveback: Giveback) {
    this.onUpdateGiveback.emit(giveback);
    this.closeSidenav();
  }
}
