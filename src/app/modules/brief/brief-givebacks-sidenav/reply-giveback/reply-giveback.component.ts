import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { Giveback } from 'src/app/models/brief/giveback';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';

@Component({
  selector: 'app-reply-giveback',
  templateUrl: './reply-giveback.component.html',
  styleUrls: ['./reply-giveback.component.scss']
})
export class ReplyGivebackComponent implements OnInit {
  public btnDisabled = false;
  public showMenu = false;
  public addToBrief = false;
  // Services
  private _briefService;
  // Public vars
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() giveback: Giveback;
  @Input() categoryTitle: string;
  @Input() subcategoryTitle: string;
  @Input() reply = '';
  // Outputs
  @Output() onAddReplyGiveback = new EventEmitter();
  @Output() onUpdateReplyGiveback = new EventEmitter();
  @Output() onCloseSidenav = new EventEmitter();
  constructor(
    private _briefStrategyService: BriefStrategyService
  ) { 
    this._briefService = this._briefStrategyService.getService();
  }

  ngOnInit() {
  }

  // Add giveback
  replyGiveback() {
    this.btnDisabled = true;
    this.giveback.reply = this.reply;
    this.briefCategoryItem.giveback = this.giveback;
    this._briefService.replyGiveback(this.briefCategoryItem, this.workspaceAccess).subscribe(item => {
      this.btnDisabled = false;
      this.onAddReplyGiveback.emit(item);
    });
  }
  // Update giveback
  updateReply() {
    this.btnDisabled = true;
    this.giveback.reply = this.reply;
    this.briefCategoryItem.giveback = this.giveback;
    this._briefService.updateReplyGiveback(this.briefCategoryItem, this.workspaceAccess).subscribe(item => {
      this.btnDisabled = false;
      this.onUpdateReplyGiveback.emit(item);
    });
  }
  // Close sidenav
  closeSidenav() {
    this.onCloseSidenav.emit();
  }

}
