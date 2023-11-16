import { Component, OnInit, Input } from '@angular/core';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';

@Component({
  selector: 'app-brief-category-header',
  templateUrl: './brief-category-header.component.html',
  styleUrls: ['./brief-category-header.component.scss']
})
export class BriefCategoryHeaderComponent implements OnInit {
  // Public vars
  public focusCategoryName = false;
  // Service
  private _briefService;
  @Input() briefCategory: BriefCategory;
  @Input() editable = false;
  @Input() commentThreadStatuses: CommentThreadStatus[];
  @Input() participantTypes: ParticipantType[];
  @Input() showCategoryMenu = true;
  constructor(
    private _briefStrategyService: BriefStrategyService
  ) { 
    this._briefService = this._briefStrategyService.getService();
  }

  ngOnInit() {
  }

  //Category name
  onFocusCategoryName() {
    this.focusCategoryName = true;
  }
  onBlurCategoryName() {
    this.focusCategoryName = false;
    this._briefService.updateCategoryTitle(this.briefCategory.id, this.briefCategory.title, false).subscribe();
  }


}
