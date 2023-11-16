import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, Input, HostListener, HostBinding }
  from '@angular/core';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { User } from 'src/app/models/users/user';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { ResponseType } from 'src/app/models/brief/response-type';

@Component({
  selector: 'app-brief-category-item-default',
  templateUrl: './brief-category-item-default.component.html',
  styleUrls: ['./brief-category-item-default.component.scss']
})
export class BriefCategoryItemDefaultComponent implements OnInit {
  // Public var
  
  // Inputs
  @Input() parentId: string;
  @Input() enabledCommentsAction = false;
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() authUser: User;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() responseTypes: ResponseType[];
  @Input() refillable = false;
  @Input() canRefill = false;
  @Input() sorting = false;
  @Input() focusedIn = false;
  // Host binding
  @HostBinding('class.editable') @Input() editable = false;
  @HostBinding('class.focusedIn') public get getIsFocusedIn(): boolean { 
    return this.focusedIn && !this.enabledCommentsAction; 
} 
  
  
  // Outputs
  @Output() onDelete = new EventEmitter();
  @Output() onCopy = new EventEmitter();
  @Output() onFocus = new EventEmitter();
  @Output() onHover = new EventEmitter();
  // Main editable
  @ViewChild('mainText') mainText: ElementRef;
  constructor(
    private elementRef: ElementRef
  ) { }
  // Init
  ngOnInit() {
  }

  // Delete
  delete() {
    this.onDelete.emit(this.briefCategoryItem);
  }
  // Copy
  copy() {
    this.onCopy.emit(this.briefCategoryItem);
  }
  onFocusEdittable(){
    if (this.editable) {
      if (!this.focusedIn){
        console.log('focus editable');
        this.focusedIn = true;
        this.onFocus.emit(this.briefCategoryItem);
      }
    }
  }
  @HostListener('click', ['$event']) onclick(event) {

    if (this.editable) {
      if (!this.focusedIn || 
        $(this.elementRef.nativeElement).closest('.brief-category-content').hasClass('sorting')) {
        this.focusedIn = true;
        this.onFocus.emit(this.briefCategoryItem);
        const targetEditable = $(event.target).closest('[contenteditable]');
        if (this.mainText && targetEditable.length === 0) {
          this.mainText.nativeElement.focus();
        }
      }
    }
  }
  @HostListener('mouseover', ['$event']) onMouseHover(event) {
    this.onHover.emit(this.briefCategoryItem);
    
  }
  


}
