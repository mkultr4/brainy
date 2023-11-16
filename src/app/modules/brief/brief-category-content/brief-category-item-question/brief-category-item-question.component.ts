import { Component, OnInit, HostListener, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { BriefCategoryItemDefaultComponent } from '../brief-category-item-default/brief-category-item-default.component';
import { ResponseType } from 'src/app/models/brief/response-type';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { TableCellType } from 'src/app/models/brief/table-cell-type';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { BriefCategoryItemType } from 'src/app/models/brief/brief-category-item-type';
import * as uuid from 'uuid/v4';

@Component({
  selector: '[app-brief-category-item-question]',
  templateUrl: './brief-category-item-question.component.html',
  styleUrls: ['./brief-category-item-question.component.scss']
})
export class BriefCategoryItemQuestionComponent
  extends BriefCategoryItemDefaultComponent
  implements OnInit {
  // Public vars 
  public enabledTemporalyRefill = false;
  public _elementRef: ElementRef;
  public focusQuestion = false;
  public focusResponse = false;
  public hasQuestionChild = false;
  // Service
  private _briefService;
  // Inputs
  @Input() tableCellTypes: TableCellType[];
  // Outpus
  @Output() onShowGivebacks = new EventEmitter();
  @Output() onChangeResponseTypeEvent = new EventEmitter();
  // View child
  @ViewChild('responseContent') responseContent: ElementRef;
  constructor(
    elementRef: ElementRef,
    private _briefServiceStrategy: BriefStrategyService
  ) {
    super(elementRef);
    this._elementRef = elementRef;
    this._briefService = this._briefServiceStrategy.getService();
  }

  ngOnInit() {
  }
  // On change response type
  onChangeResponseType(data) {
    // console.log(data);
    let focusResponse = false
    if (!this.briefCategoryItem.responseType) {
      focusResponse = true;
    }
    // Set the data of response type
    this.briefCategoryItem.childs = [];
    this.briefCategoryItem.responseType = data.type;
    this.briefCategoryItem.responseSettings = data.settings;
    this.briefCategoryItem.responseContent = data.content;
    // console.log(this.briefCategoryItem);
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
      if (focusResponse) {
        this.responseContent.nativeElement.click();
      }
      this.onChangeResponseTypeEvent.emit(this.briefCategoryItem);
    });


  }
  // Enabled fill
  enabledFill() {
    if (this.editable && !this.refillable) {
      this.enabledTemporalyRefill = !this.enabledTemporalyRefill;
    }
  }
  // On change question 
  onChangeQuestion() {
    // Update service

    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
      $('.comment-thread-point-brief').trigger('resize');
    });
  }

  // On content response change   
  onResponseContentChange(responseContent) {
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
    });
  }
  // On settings change
  onResponseSettingsChange(responseSettings) {
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
    });
  }
  // Focus main text
  focusMainText(target) {
    const targetEditable = target.closest('[contenteditable]');
    if (this.mainText && targetEditable.length === 0) {
      this.mainText.nativeElement.focus();
    }
  }
  // On focus question
  onQuestionFocus($event) {
    // const target = $(event.target);
    // const targetEditable = target.closest('[contenteditable]');
    if (this.editable) {
      if (!this.focusQuestion) {
        // $(this._elementRef.nativeElement).find(`.brief-category-item-content-question`).click();
      }

    }
  }
  // On focus resposne
  onResponseFocus() {
    if (this.editable) {
      if (!this.focusResponse) {
        $(this._elementRef.nativeElement).find(`.brief-category-item-question-response`).click();
      }

    }
  }
  // Focus workflow
  focusQuestionWorkflow(target) {
    console.log(target);
    if (!this.briefCategoryItem.responseType) {
      this.focusQuestion = true;
      this.focusResponse = true;
      if (target.closest(`.brief-category-item-content-question`).length > 0) {
        this.focusMainText(target);
      }
    } else {
      if (target.closest(`.brief-category-item-content-question:not(.brief-category-item-content-question-child)`).length > 0) {
        this.focusQuestion = true;
        this.focusResponse = false;
        // Update table when click outside of response
        if (this.briefCategoryItem.responseType.key === 'table') {
          if (this.briefCategoryItem.responseSettings.table.isNew) {
            this.briefCategoryItem.responseSettings.table.isNew = false;
            this.briefCategoryItem.responseSettings.table.rows.forEach(r => {
              r.cells.forEach(c => {
                c.isNew = false;
              });
            });

            // Update
            this.onResponseSettingsChange(this.briefCategoryItem.responseSettings);
          }
        }
        console.log(target.closest('[contenteditable="true"]'));
        this.focusMainText(target);

      } else if (target.closest(`.brief-category-item-question-response`).length > 0) {
        setTimeout(() => {
          this.focusQuestion = false;
          this.focusResponse = true;
        });

      }

    }
  }
  // On change accept files
  onChangeAcceptFiles(acceptFiles) {
    this.briefCategoryItem.responseSettings.acceptFiles = acceptFiles;
    // Update
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
    });
  }
  // Response child
  onChangeResponseChild(value) {
    if (value) {
      const child = new BriefCategoryItem();
      child.id = uuid();
      child.idQuestionParent = this.briefCategoryItem.id;
      child.type = BriefCategoryItemType.QUESTION;
      child.idBriefCategory = this.briefCategoryItem.idBriefCategory;
      child.responseType = this.responseTypes.filter(t => t.key === 'text')[0];
      child.responseContent = { text: '' };
      child.responseSettings = { maxLength: 300 };
      // Push a child
      this.briefCategoryItem.childs.push(child);
    } else {
      this.briefCategoryItem.childs = [];
    }
    // Update
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
    });

  }
  // Show givebacks
  showGivebacks($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.onShowGivebacks.emit(this.briefCategoryItem);
  }
  //  Delete response
  deleteResponse() {
    this.briefCategoryItem.responseType = undefined;
    this.briefCategoryItem.responseSettings = undefined;
    this.briefCategoryItem.responseContent = undefined;
    // Update
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
      this.focusQuestion = true;
    });
  }
  // Click
  @HostListener('click', ['$event']) onclick(event) {
    if (this.editable) {
      const target = $(event.target);
      // Parent focus
      if (!this.focusedIn ||
        $(this._elementRef.nativeElement).closest('.brief-category-content').hasClass('sorting')
      ) {
        this.focusedIn = true;
        this.onFocus.emit(this.briefCategoryItem);
      }

      this.focusQuestionWorkflow(target);

    }
  }


}
