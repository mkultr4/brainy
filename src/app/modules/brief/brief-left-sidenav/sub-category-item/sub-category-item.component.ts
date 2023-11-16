import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { UtilService } from 'src/app/services/utils/util.service';

@Component({
  selector: 'app-sub-category-item',
  templateUrl: './sub-category-item.component.html',
  styleUrls: ['./sub-category-item.component.scss']
})
export class SubCategoryItemComponent implements OnInit {
  public iEditable = false;
  public lineEmpty = `<span><br></span>`
  public lineEmpty2 = `<br>`
  // Input
  @Input() item: BriefCategoryItem;
  @Input() briefCategoryShow: BriefCategory;
  @Input() editable;
  @Input() visible = true;
  // Outputs
  @Output() subCategoryOnUpdate = new EventEmitter();
  @Output() subCategoryOnRemove = new EventEmitter();
  @Output() subCategoryClick = new EventEmitter();
  // View child
  @ViewChild('editor') editor: ElementRef;
  constructor(
    private _utilService: UtilService
  ) { }
  // Init
  ngOnInit() {
  }

  // Remove subtopic
  removeSubCategory() {
    this.subCategoryOnRemove.emit(this.item);
  }

  // Edit title
  editTitle() {
    this.iEditable = true;
    this.gotToSubTopic();
    setTimeout(() => {
      this.placeCaretAtEnd(this.editor.nativeElement);
    });
  }
  // Blur editor
  blurEditor() {
    setTimeout(() => {
      this.iEditable = false;
      this.subCategoryOnUpdate.emit(this.item);

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
  // Go to sub topic
  gotToSubTopic() {
    this.subCategoryClick.emit();
    const timeout = this.briefCategoryShow.id === this.item.idBriefCategory ? 0 : 300;
    setTimeout(() => {
      const line = $(`#${this.item.id}`);
      const scrollParent = this._utilService.getScrollParent(line.get(0), true);
      this._utilService.scrollTo(scrollParent, line.get(0));
    }, timeout);
  }
}
