import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { Giveback } from 'src/app/models/brief/giveback';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';

@Component({
  selector: 'app-create-giveback',
  templateUrl: './create-giveback.component.html',
  styleUrls: ['./create-giveback.component.scss']
})
export class CreateGivebackComponent implements OnInit {
  public btnDisabled = false;
  public showMenu = false;
  // Services
  private _briefService;
  // Public vars
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() giveback: Giveback;
  @Input() categoryTitle: string;
  @Input() subcategoryTitle: string;
  @Input() message = '';
  @Input() editable = false;
  // Output
  @Output() onAddGiveback = new EventEmitter();
  @Output() onUpdateGiveback = new EventEmitter();
  @Output() onCloseSidenav = new EventEmitter();
  // Constructor
  constructor(
    private _briefStrategyService: BriefStrategyService
  ) {
    this._briefService = this._briefStrategyService.getService();
  }

  ngOnInit() {
  }
  // Add giveback
  addGiveback() {
    this.btnDisabled = true;
    this.giveback.message = this.message;
    this.briefCategoryItem.giveback = this.giveback;
    this._briefService.addGiveback(this.briefCategoryItem, this.workspaceAccess).subscribe(item => {
      this.btnDisabled = false;
      this.onAddGiveback.emit(item);
    });
  }
  // Update giveback
  updateGiveback() {
    this.btnDisabled = true;
    this.giveback.message = this.message;
    this.briefCategoryItem.giveback = this.giveback;
    this._briefService.updateGiveback(this.briefCategoryItem, this.workspaceAccess).subscribe(item => {
      this.btnDisabled = false;
      this.onUpdateGiveback.emit(item);
    });
  }
  // Close sidenav
  closeSidenav() {
    this.onCloseSidenav.emit();
  }

}
