import { Component, OnInit, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/users/user';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { Option } from 'src/app/models/brief/option';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';

@Component({
  selector: 'app-brief-category-item-question-child',
  templateUrl: './brief-category-item-question-child.component.html',
  styleUrls: ['./brief-category-item-question-child.component.scss']
})
export class BriefCategoryItemQuestionChildComponent implements OnInit {
  // Service
  private _briefService;
  // Inputs  
  // Association
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() options: Option[];
  @Input() optionsChecked: Option[];
  @Input() authUser: User;
  @Input() workspaceAccess: WorkspaceAccess;
  // Workflow
  @Input() enabledCommentsAction = false;
  @Input() refillable = false;
  @Input() canRefill = false;
  @Input() sorting = false;
  @Input() focusResponse = false;
  @Input() focusQuestion = false;
  @Input() editable = false;
  @Input() enableDelete = false;
  @Input() candAdd = false;
  // Output 
  @Output() onAddQuestion = new EventEmitter();
  @Output() onDeleteQuestion = new EventEmitter();
  constructor(
    private _elementRef: ElementRef,
    private _briefStrategyService: BriefStrategyService
  ) {
    this._briefService = this._briefStrategyService.getService();
  }

  ngOnInit() {
  }

  // On focus question
  onQuestionFocus($event) {
    // const target = $(event.target);
    // const targetEditable = target.closest('[contenteditable]');
    if (this.editable) {
      if (!this.focusResponse) {
        // $(this._elementRef.nativeElement).find(`.brief-category-item-content-question`).click();
      }

    }
  }
  // On change question 
  onChangeQuestion() {
    // Update service
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
      // Put on text can be change
      setTimeout(() => {
        $('.comment-thread-point-brief').trigger('resize');
      });
    });
  }

  onResponseContentChange(responseContent) {
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
    });
  }
  onResponseFocus() {

  }
  selectParentOption($event, option) {
    // $event.preventDefault();
    // $event.stopPropagation();
    this.briefCategoryItem.optionParent = option;
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
    });
  }
  /**
   * Is response child is visible
   */
  isVisible() {
    return this.editable || this.optionsChecked.findIndex(o => o.id === this.briefCategoryItem.optionParent.id) >= 0;
  }
  // Add question
  addQuestion($event) {
    $event.preventDefault();
    $event.stopPropagation()
    this.onAddQuestion.emit();
  }
  // Delete question
  delete() {
    this.onDeleteQuestion.emit(this.briefCategoryItem);
  }
}
