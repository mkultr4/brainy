import { Component, OnInit, Input, HostListener, Output, HostBinding, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { BriefWorkflowService } from '../../services/brief-workflow.service';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { BriefCategoryItemType } from 'src/app/models/brief/brief-category-item-type';


@Component({
  selector: '[app-category-item]',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {
  // Public vars
  public collapse = true;
  public iEditable = false;
  public sorting = false;

  // Services
  private _briefService;
  // Inputs
  @Input() briefCategory: BriefCategory;
  @Input() briefCategoryShow: BriefCategory;
  @Input() view;
  @Input() index;
  @Input() editable;
  @Input() visible = true;
  @Input() sortingSubCategory = false;
  // Outputs
  @Output() categoryOnSelect = new EventEmitter();
  @Output() categoryOnRemove = new EventEmitter();
  @Output() categoryOnDragOver = new EventEmitter();
  @Output() categoryOnSortingSubCategory = new EventEmitter();
  @Output() categoryOnSortSubCategory = new EventEmitter();
  @Output() categoryOnSortAddSubCategory = new EventEmitter();
  @Output() categoryOnUpdateSubCat = new EventEmitter();
  @Output() categoryOnRemoveSubCat = new EventEmitter();
  // Host bindings
  @HostBinding('class.dragOver') dragOver = false;
  // View child
  @ViewChild('editor') editor: ElementRef;
  @ViewChild('subtopicList') subtopicList: ElementRef;

  constructor(
    private _briefStrategyService: BriefStrategyService,
    private _briefWorkFlowService: BriefWorkflowService
  ) {
    this._briefService = this._briefStrategyService.getService();
  }


  ngOnInit() {
    
  }

  // Show topic
  showCategory() {
    if ((this.briefCategory.id !== this.briefCategoryShow.id) || this.view !== 'category') {
      this.categoryOnSelect.emit(this.briefCategory);
    }
  }

  /**
   * On change topic title
   * @param $event 
   */
  onChangeTopicTitle(topicTitle) {
    if (this.visible) {
      this._briefService.updateCategoryTitle(this.briefCategory.id, this.briefCategory.title, false).subscribe(
        (briefCategory) => {
          if (this.briefCategory.id === this.briefCategoryShow.id) {
            this._briefWorkFlowService.fnUpdateTitleBriefCategory(this.briefCategory.title);
          }
        });
    }

  }
  // Remove topic
  removeTopic() {
    this.categoryOnRemove.emit(this.briefCategory);
  }
  // Edit title
  editTitle() {
    this.iEditable = true;

    setTimeout(() => {
      this.placeCaretAtEnd(this.editor.nativeElement);
    });
  }
  // On blur
  blurEditor() {
    setTimeout(() => {
      this.iEditable = false;
      this._briefService.updateCategoryTitle(this.briefCategory.id, this.briefCategory.title, true).subscribe(
        (briefCategory) => {
          if (this.briefCategory.id === this.briefCategoryShow.id) {
            this._briefWorkFlowService.fnUpdateTitleBriefCategory(this.briefCategory.title);
          }
        });
    });



  }
  // Focus last character
  placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
      && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
  // Collapse
  collapseClick() {
    this.collapse = !this.collapse;
  }

  // #region Sun category

  // Sub category on click
  subCategoryClick() {
    this.showCategory();
  }
  /**
   * Remove subcategory
   * @param briefCategoryItem 
   */
  removeSubCategory(briefCategoryItem: BriefCategoryItem) {

    this._briefService.removeBriefCategoryItem(briefCategoryItem.id).subscribe((response) => {
      if (this.briefCategoryShow.id === this.briefCategory.id) {
        this.categoryOnRemoveSubCat.emit(briefCategoryItem);
      }
    });

  }

  updateSubCategory(briefCategoryItem: BriefCategoryItem) {

    this._briefService.updateBriefCategoryItem(briefCategoryItem).subscribe((response) => {
      if (this.briefCategoryShow.id === this.briefCategory.id) {
        this.categoryOnUpdateSubCat.emit(briefCategoryItem);
      }
    });

  }
  // #endregion

  // #region Sorting
  // Mouse over
  @HostListener('mouseover', ['$event']) mouseover($event) {
    if (this.sortingSubCategory) {
      this.dragOver = true;
      this.categoryOnDragOver.emit();
    }

  }

  // Mouse leave
  @HostListener('mouseleave') dragendTopic($event) {
    this.dragOver = false;
    this.categoryOnDragOver.emit();
  }



  // On sort start
  onSortStart() {

    $(this.subtopicList.nativeElement).addClass('sorting');
    this.sorting = true;
    this.categoryOnSortingSubCategory.emit(this.sorting);

  }
  // On sort end
  onSortEnd() {

    $(this.subtopicList.nativeElement).removeClass('sorting');
    this.sorting = false;
    this.categoryOnSortingSubCategory.emit(this.sorting);

  }
  // On sort update
  onSortUpdate(event) {
    // Sub topic updated
    const oldIndex = event.oldIndex;
    const newIndex = event.newIndex;
    // Get all subtopics
    const subCategoryItems = this.briefCategory.items.filter(i => i.type === BriefCategoryItemType.SUB_CATEGORY);
    // Items sorter
    const newItem = subCategoryItems[newIndex];
    const oldItem = subCategoryItems[oldIndex];
    const oldOrder = newItem.order;
    const newOrder = oldItem.order;
    // Set orders
    newItem.order = newOrder;
    oldItem.order = oldOrder;
    // New array without these items

    const newArray = this.briefCategory
      .items
      .filter(
        i =>
          i.id !== newItem.id && i.idParent !== newItem.id
          && i.id !== oldItem.id && i.idParent !== oldItem.id);
    // New Subtopic array
    const newSubtopicArray = this.briefCategory
      .items
      .filter(i => i.idParent === newItem.id);
    // Add subtopic
    newSubtopicArray.unshift(newItem);
    // Append new array
    newArray.splice(newItem.order - 1, 0, ...newSubtopicArray);
    // Old Subtopic array
    const oldSubtopicArray = this.briefCategory
      .items
      .filter(i => i.idParent === oldItem.id);
    // Add subtopic
    oldSubtopicArray.unshift(oldItem);
    // Append new array
    newArray.splice(oldItem.order - 1, 0, ...oldSubtopicArray);
    // Order
    let order = 1;
    newArray.forEach((tl, index) => {
      //  console.log(tl, index);
      newArray[index].order = order
      order++;
    });
    this._briefService.updateBriefCategoryItems(this.briefCategory, newArray).subscribe(response => {
      this.categoryOnSortSubCategory.emit();
    });
  }

  // On sort add
  async onSortAdd(event) {
    // Get data
    const itemDropped = event.item;
    const subCategoryId = itemDropped.dataset.id;
    const categoryId = itemDropped.dataset.categoryId;
    // New index to puch
    const newIndexEvent = event.newIndex;
    // Get Subcatecory items
    const subCategoryItems = this.briefCategory.items.filter(i => i.type === BriefCategoryItemType.SUB_CATEGORY);
    // Get subtopic dragged
    let subCategoryContent = [];
    await this._briefService.getSubCategoryContent(categoryId, subCategoryId).subscribe(items => {
      subCategoryContent = Object.assign([], items);
    });
    // Set relationship
    subCategoryContent.forEach((s, index) => {
      s.idBriefCategory = this.briefCategory.id;
    });
    // Subtopic old
    const subTopicOld = subCategoryItems[newIndexEvent];
    console.log('subTopicOld',subTopicOld);
    let newIndex = 1;
    if (subTopicOld) {
      newIndex = subTopicOld.order - 1;
    } else {
      newIndex = newIndexEvent;
    }
    let subtCategoryOldContent = [];
    if (subTopicOld) {
      subtCategoryOldContent = this.briefCategory
        .items.filter(i => i.idParent === subTopicOld.id);
        subtCategoryOldContent.unshift(subTopicOld);
    }
    
    // Generate new array dropped
    let newArrayDropped = [];
    if (subTopicOld) {
      console.log('filtro por el old')
      newArrayDropped = this.briefCategory.items
        .filter(i => i.idParent !== subTopicOld.id && i.id !== subTopicOld.id);
    } else {
      console.log('no filtro por el old')
      newArrayDropped = this.briefCategory.items;
    }

    // Put the old
    if (subTopicOld) {
      // Add new topic
      newArrayDropped.splice(newIndex, -1, ...subCategoryContent);
      // Add old content
      newArrayDropped.splice(newIndex + subCategoryContent.length, 0, ...subtCategoryOldContent);
    } else {
      // Push
      newArrayDropped.push(...subCategoryContent);
    }
    let order = 1;
    newArrayDropped.forEach((tl, index) => {
      //  console.log(tl, index);
      newArrayDropped[index].order = order
      order++;
    });
    console.log('newArrayDropped',newArrayDropped);
    // Update dropped
    this._briefService.updateBriefCategoryItems(this.briefCategory.id, newArrayDropped).subscribe(response => {
      if (this.briefCategoryShow.id === this.briefCategory.id) {
        this.categoryOnSortSubCategory.emit();
      }
      this.showCategory()
      this.collapse = false;
    });
    // Remove old
    this._briefService.removeSubCategoryContent(categoryId, subCategoryId).subscribe();
  }
  // #endregion 


}
