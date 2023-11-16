import { Component, OnInit, Input } from '@angular/core';
import { Option } from 'src/app/models/brief/option';
import { User } from 'src/app/models/users/user';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { BriefCategoryItemType } from 'src/app/models/brief/brief-category-item-type';
import { ResponseType } from 'src/app/models/brief/response-type';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'app-brief-category-item-question-child-container',
  templateUrl: './brief-category-item-question-child-container.component.html',
  styleUrls: ['./brief-category-item-question-child-container.component.scss']
})
export class BriefCategoryItemQuestionChildContainerComponent implements OnInit {
  // Services
  private _briefService;
  // Inputs  
  // Association
  @Input() briefCategoryItemParent: BriefCategoryItem;
  @Input() childs: BriefCategoryItem[];
  @Input() options: Option[];
  @Input() optionsChecked: Option[];
  @Input() responseTypes: ResponseType[];
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

  constructor(
    private _briefStrategyService: BriefStrategyService
  ) {
    this._briefService = this._briefStrategyService.getService();
  }
  // Init
  ngOnInit() {
  }
  // On add question
  onAddQuestion() {
    const child = new BriefCategoryItem();
    child.id = uuid();
    child.idQuestionParent = this.briefCategoryItemParent.id;
    child.type = BriefCategoryItemType.QUESTION;
    child.idBriefCategory = this.briefCategoryItemParent.idBriefCategory;
    child.responseType = this.responseTypes.filter(t => t.key === 'text')[0];
    child.responseContent = { text: '' };
    child.responseSettings = { maxLength: 300 };
    // Push a child
    this.briefCategoryItemParent.childs.push(child);
    this._briefService.updateBriefCategoryItem(this.briefCategoryItemParent).subscribe(response => {
    });
  }

  /**
   * On delete question
   * @param briefCategoryItem 
   */
  onDeleteQuestion(briefCategoryItem: BriefCategoryItem) {
    const index = this.briefCategoryItemParent.childs.findIndex(b => b.id === briefCategoryItem.id);
    this.briefCategoryItemParent.childs.splice(index, 1);
    this._briefService.updateBriefCategoryItem(this.briefCategoryItemParent).subscribe(response => {

    });

  }

}
