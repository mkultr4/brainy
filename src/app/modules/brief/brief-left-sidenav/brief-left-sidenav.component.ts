import { Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { Brief } from 'src/app/models/brief/brief';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { ToastrService } from 'ngx-toastr';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';

@Component({
  selector: 'app-brief-left-sidenav',
  templateUrl: './brief-left-sidenav.component.html',
  styleUrls: ['./brief-left-sidenav.component.scss']
})
export class BriefLeftSidenavComponent implements OnInit{
  // Public vars
  public sorting = false;
  public sortingSubCategory = false;
  
  // Service
  public _briefService;
  // Inputs
  @Input() brief: Brief;
  @Input() briefCategories: BriefCategory[] = [];
  @Input() briefCategoryShow: BriefCategory;
  @Input() editable = false;
  @Input() compressed = false;
  @Input() withGiveBacks = true;
  @Input() givebacks = [];
  @Input() hasRepliesNews = false;
  @Input() view;
  // Output 
  @Output() onShowBriefCategory = new EventEmitter();
  @Output() updateSuCategory = new EventEmitter();
  @Output() removeSubCategory = new EventEmitter();
  @Output() updateMainContent = new EventEmitter();
  @Output() onChangeView = new EventEmitter();
  
  // View childs
  @ViewChild('categoriesList', { read: PerfectScrollbarDirective }) categoryList: PerfectScrollbarDirective;
  // constructor
  constructor(
    public _workflowService: WorkflowService,
    public _briefStrategyService: BriefStrategyService,
    public _toastrService: ToastrService
  ) {
    this._briefService = this._briefStrategyService.getService();
  }

  ngOnInit() {
  }

  // Add category
  addCategory() {
    this.onChangeView.emit('category');
    this.checkCategories();
    this._briefService.addCategory(this.brief.id).subscribe(category => {
      this.onShowBriefCategory.emit(category);
      setTimeout(()=>{
        this.categoryList.scrollToBottom();
      });
      
    });
  }

  // Check categories without title
  checkCategories() {
    let categoriesWithoutTitle = [];
    this.briefCategories.forEach((t, index) => {
      if (t.title.length === 0) {
        // countWithoutTitle++;
        categoriesWithoutTitle.push(this.briefCategories[index]);
      }
    });
    if (categoriesWithoutTitle.length > 0) {
      this._briefService.updateBriefCategoryListTitle(categoriesWithoutTitle).subscribe();
    }


  }
  // Show category
  showCategory(category: BriefCategory) {
    if(this.view !== category){
      this.onChangeView.emit('category');
    }
    
    this.onShowBriefCategory.emit(category);
  }
  // Remove category
  removeCategory(category: BriefCategory) {
    this._briefService.removeBriefCategory(category.id).subscribe((categories) => {
      if (category.id === this.briefCategoryShow.id) {
        setTimeout(() => {
          this.onShowBriefCategory.emit(this.briefCategories[0]);
        });
      }
    });
  }
  // On sorting subcategory
  categoryOnSortingSubCategory(sorting) {
    this.sortingSubCategory = sorting;
  }
  // On sort subcategory
  categoryOnSortSubCategory() {
    this.updateMainContent.emit('on sort sub category');
  }
  // Category drag over
  categoryDragOver() {
    this.categoryList.update();
  }

  // Compress
  compress() {
    setTimeout(() => {
      this._workflowService.compressLeftSidenav(!this.compressed);
    });

  }
  // On sort start
  onSortStart() {

    $(this.categoryList.elementRef.nativeElement).addClass('sorting');
    this.sorting = true;

  }
  // On sort end
  onSortEnd() {

    $(this.categoryList.elementRef.nativeElement).removeClass('sorting');
    this.sorting = false;

  }
  // On sort update
  onSortUpdate(event) {
    let order = 1;
    this.briefCategories.forEach((piece, index) => {
      this.briefCategories[index].order = order;
      order++;
    });
    this._briefService.updateOrderCategories(this.briefCategories).subscribe(suc => {
    }, error => {
      this._toastrService.error('No se pudieron actualizar intente nuevamente');
    });
  }
  // #region Sun category
  /**
   * When remove subcategory and i need update the main content
   * @param briefCategoryItem 
   */
  onRemoveSubCategory(briefCategoryItem: BriefCategoryItem) {
    this.removeSubCategory.emit(briefCategoryItem);
  }
  /**
   * When update subcategory and i need update the main content
   * @param briefCategoryItem 
   */
  onUpdateSubCategory(briefCategoryItem: BriefCategoryItem) {
    this.updateSuCategory.emit(briefCategoryItem);
  }
  // #endregion
  /**
   * Show view
   * @param view 
   */
  showView(view){
    this.onChangeView.emit(view);
  }

}
