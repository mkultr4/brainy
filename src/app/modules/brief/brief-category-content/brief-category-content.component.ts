import { Component, OnInit, Input, ViewChild, HostListener, AfterContentInit, ViewChildren, QueryList, Renderer2, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { BriefToolbarMenuActionsComponent } from '../brief-toolbar-menu-actions/brief-toolbar-menu-actions.component';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { ISubscription } from 'rxjs/Subscription';
import { BriefToolbarAction } from '../models/brief-toolbar-action';
import { BriefCategoryItemType } from 'src/app/models/brief/brief-category-item-type';
import { BriefCategoryItemDefaultComponent } from './brief-category-item-default/brief-category-item-default.component';
import { BriefCategoryItemQuestionComponent } from './brief-category-item-question/brief-category-item-question.component';
import { ResponseType } from 'src/app/models/brief/response-type';
import { OrderByPipe } from 'ngx-pipes';
import { CategoryItemFile } from 'src/app/models/brief/category-item-file';
import { BriefCategoryItemVideoComponent } from './brief-category-item-video/brief-category-item-video.component';
import { TableCellType } from 'src/app/models/brief/table-cell-type';
import * as uuid from 'uuid/v4';
import { Table } from 'src/app/models/brief/table';
import ResponseTypeSetting from 'src/app/interface/brief/ResponseTypeSetting';
import ResponseContent from 'src/app/interface/brief/ResponseContent';
import { TableColumn } from 'src/app/models/brief/table-column';
import { TableCell } from 'src/app/models/brief/table-cell';
import { TableRow } from 'src/app/models/brief/table-row';
import { Option } from 'src/app/models/brief/option';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { BriefCommentsService } from '../services/brief-comments.service';
import { CommentComunicationService, CommentThreadFilter } from '../../comment-thread/services/comment-comunication.service';
import { RangyService } from 'src/app/services/utils/rangy.service';
import { CommentThread } from 'src/app/models/comments/comment-thread';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { BriefWorkflowService } from '../services/brief-workflow.service';
import { BriefGivebacksSidenavComponent } from '../brief-givebacks-sidenav/brief-givebacks-sidenav.component';
import { Giveback } from 'src/app/models/brief/giveback';
import { BriefTutorialResponseComponent } from '../brief-tutorial-response/brief-tutorial-response.component';
import { DynamicContent } from 'src/app/models/brief/dynamic-content';
import { Icon } from 'src/app/models/icons/Icon';
import { UtilService } from 'src/app/services/utils/util.service';

@Component({
  selector: 'app-brief-category-content',
  templateUrl: './brief-category-content.component.html',
  styleUrls: ['./brief-category-content.component.scss'],
  providers: [OrderByPipe, BriefCommentsService]
})
export class BriefCategoryContentComponent implements OnInit, AfterContentInit, OnDestroy {
  // Public vars
  public categoryChangesObserver: MutationObserver;
  public briefCategory: BriefCategory;
  public briefCategoryItems: BriefCategoryItem[];
  public _briefCategoryShow: BriefCategory;
  public sorting = false;
  public focusCategory = false;
  public categoryEditionLogs = [];
  // Comments
  public isShowToolbarComments = false;
  public forceShowToolbarComments = false;
  public enabledCommentsAction = false;
  public toolbarCommentsTop = 0;
  // Givebacks 
  public isOverQuestion = false;
  public briefCategoryItemHover: BriefCategoryItem;
  public isShowToolbarGiveback = false;

  // Comments filters
  public filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  public filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  // Clasess
  public briefCategoryItemClass = 'brief-category-item';
  public focusedClass = 'focusedIn';
  public mouseOverClass = 'mouseOver';
  // Subscription
  public subscriptionCategoriesItems: ISubscription;
  public subscriptionComments: ISubscription;
  public subscriptionCommentThreadFilter: ISubscription;
  // Services
  private _briefService;
  private _commentThreadService;
  // Inputs
  @Input() briefCategories;
  @Input() last = false;
  @Input() set briefCategoryShow(briefCategoryShow: BriefCategory) {
    this._briefCategoryShow = briefCategoryShow;
    if (this._briefCategoryShow && this._briefCategoryShow.id) {
      this.getCategory();
      this.checkIfLast();
    }
  }
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() editable = false;
  @Input() enableComments = false;
  @Input() commentThreadStatuses: CommentThreadStatus[];
  @Input() participantTypes: ParticipantType[];
  @Input() refillable = false;
  @Input() canRefill = false;
  @Input() canAddGiveBack = false;
  @Input() isShowSidenavGiveback = false;
  @Input() showCategoryMenu = true;
  @Input() template = false;
  // Category items
  @Input() responseTypes: ResponseType[];
  // Table cell types
  @Input() tableCellTypes: TableCellType[];
  // Tutorial 
  @Input() hasTourResponse = false;
  // Outputs
  @Output() onNextCategory = new EventEmitter();
  @Output() onSend = new EventEmitter();
  @Output() onShowGiveBack = new EventEmitter();
  @Output() onTutorialResponseEnd = new EventEmitter();
  // View child
  @ViewChild('briefToolbarActions') briefToolbarActions: BriefToolbarMenuActionsComponent;
  @ViewChild('briefCategoryInner') briefCategoryInner: ElementRef;
  @ViewChild('briefCategoryContent', { read: PerfectScrollbarDirective }) briefCategoryContent: PerfectScrollbarDirective;
  @ViewChild(BriefTutorialResponseComponent) briefTutorialResponse: BriefTutorialResponseComponent;
  // Query List
  // View Childre
  @ViewChildren('briefCategoryItems') briefCategoryItemsComp: QueryList<BriefCategoryItemDefaultComponent>;
  // constructor
  constructor(
    private _briefStrategyService: BriefStrategyService,
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _orderByPipe: OrderByPipe,
    private _renderer2: Renderer2,
    private _commentComunicationService: CommentComunicationService,
    private _rangyService: RangyService,
    private _briefCommentsService: BriefCommentsService,
    private _briefWorkflowService: BriefWorkflowService,
    private _utilService: UtilService
  ) {
    this._briefService = this._briefStrategyService.getService();
    this._commentThreadService = this._commentThreadStrategyService.getService();
  }

  ngOnInit() {
    this.observeDOMChanges();
  }
  // Get category
  getCategory() {

    this._briefService.getBriefCategory(this._briefCategoryShow.id).subscribe(category => {

      this.briefCategory = Object.assign({}, category);
      this._briefService.loadAllBriefCategoryItems(this.briefCategory.id, this.briefCategory.items).subscribe(items => {
        //  Dom changes

        // Set items
        this.briefCategoryItems = Object.assign([], this._orderByPipe.transform(items, 'order'));
        // Load comments

        // Check if is empty
        if (this.briefCategoryItems.length === 0) {
          this.focusCategory = true;
          this.briefToolbarActions.focusToolbar(this.focusCategory, undefined);
          setTimeout(() => {
            this.loadCommentThreads();
            this.loadTopicEditionLog();
          });
        } else if (this.briefCategoryItems.length > 0) {
          setTimeout(() => {
            this.loadCommentThreads();
            this.loadTopicEditionLog();
            this.focusCategory = false;
            this.briefToolbarActions.focusToolbar(this.focusCategory, undefined);
          })
        }
      });
    });
  }
  /**
   * Update category
   * @param addedItems 
   * @param updateItems 
   * @param removeItems 
   */
  updateCategory(addedItems: BriefCategoryItem[], updateItems: BriefCategoryItem[], removeItems: BriefCategoryItem[]) {
    setTimeout(() => {

      if (updateItems.length > 0) {
        updateItems.forEach(item => {
          const search = this.briefCategoryItems.filter(i => i.id === item.id)[0];
          search.title = item.title;
        });
      }
      // Load comments
      // this.loadCommentThreads();
      setTimeout(() => {
        // Load edition log
        this.loadTopicEditionLog();
      });
    });
  }
  /**
   * Load comment threads
   */
  loadCommentThreads() {
    this._commentThreadService.loadAll('BRIEF_CATEGORY', this.briefCategory.id, this.briefCategory.commentThreads).subscribe();
    this.subscriptionComments = this._commentThreadService.commentThreads.subscribe((commentThreads) => {
      this.briefCategory.commentThreads = Object.assign([], commentThreads);
      // To update local storage
      this._briefService.updateBriefCategoryCommentThread(this.briefCategory);
      // check if comments unsaved
      const unsaved = this.briefCategory.commentThreads.filter(c => !c.saved).length > 0;

      if (!unsaved && this.briefCategory.commentThreads.length > 0) {
        // console.log('check status comments');
        // this._feedbackWorkflowService.checkStatus(commentThreads[commentThreads.length - 1]);
        // this._meetingNoteWorkflowService.checkStatus(commentThreads[commentThreads.length - 1]);

      }

    });
  }
  /**
 * Load topic edition logs
 */
  loadTopicEditionLog() {
    this._briefService.findCategoryEditionLog(this.briefCategory.id).subscribe(response => {
      this.categoryEditionLogs = response;
    });
  }
  ngAfterContentInit() {

    this.subscriptionCategoriesItems = this._briefService.categoriesItems.subscribe(items => {
      // console.log('update items',items)
      // Update datastore general
      this._briefService.updateStoreCategory(this.briefCategory, items);
    });
    this.subscriptionCommentThreadFilter = this._commentComunicationService.commentThreadFilterObs.subscribe(
      (filter: CommentThreadFilter) => {

        this.filterStatuses = Object.assign([], filter.statuses);
        this.filterParticipantTypes = Object.assign([], filter.praticipantTypes);
      });

  }
  // Observe Dom Changes
  observeDOMChanges() {
    this.categoryChangesObserver = new MutationObserver(mutations => {
      mutations.forEach((mutation) => {

        // Remove node
        if (mutation.removedNodes.length > 0) {
          // On remove
          for (let i = 0; i < mutation.removedNodes.length; ++i) {
            const item = mutation.removedNodes[i];
            const itemId = item['id'];

            // If item is not child
            if ($(item).hasClass('comment-thread-selection')) {
              console.log(item);
              const commentThreadId = $(item).data('comment-id');
              if ($(this.briefCategoryInner.nativeElement).find(`.comment-thread-selection-${commentThreadId}`).length === 0) {
                // console.log('remove comment', commentThreadId);
                this._commentThreadService.remove(commentThreadId).subscribe();
              }
            }
          }
        }
      });
    });
    const config = { childList: true, subtree: true };
    this.categoryChangesObserver.observe(this.briefCategoryInner.nativeElement, config);
  }
  // #region Client actions
  nextCategory() {
    this.onNextCategory.next(this.briefCategory);
  }
  send() {
    this.onSend.next();
  }
  checkIfLast() {
    if (this.briefCategories.length > 0) {
      const currentIndex = this.briefCategories.findIndex(b => b.id === this._briefCategoryShow.id);

      const length = this.briefCategories.length - 1;

      if (currentIndex < length) {
        this.last = false;
      } else {
        this.last = true;
      }
    }
  }
  // #endregion
  /**
 * On click editor
 * @param $event
 */
  briefContentClick($event) {
    if (this.editable) {
      if (this.briefCategoryItems.length === 0) {
        const target = $(event.target);
        if (
          target.closest('#main-toolbar-menu-category').length === 0
        ) {
          this.focusCategory = true;
          this.briefToolbarActions.focusToolbar(this.focusCategory, undefined);
        }

      }
    }

  }
  /**
   * On focus brief category item
   * @param briefCategoryItem 
   */
  onFocusBriefCategoryItem(briefCategoryItem: BriefCategoryItem) {
    // console.log(this.briefCategoryItemsComp);
    this.briefCategoryItemsComp.filter(i => i.briefCategoryItem.id !== briefCategoryItem.id).forEach(c => {
      if (c instanceof BriefCategoryItemQuestionComponent) {
        c.focusQuestion = false;
        c.focusResponse = false;
        c.enabledTemporalyRefill = false;
      }
      c.focusedIn = false;
    });
    setTimeout(() => {
      const focused = document.getElementById(briefCategoryItem.id);
      this.focusCategory = true;
      this.briefToolbarActions.focusToolbar(this.focusCategory, focused);
    });
  }
  /**
   * On toolbar add action
   * @param action 
   */
  toolbarOnAction(action: BriefToolbarAction) {
    //  console.log(action);
    if (action.type === BriefCategoryItemType.QUESTION) {
      this.addQuestion();
    } else if (action.type === BriefCategoryItemType.SUB_CATEGORY) {
      this.addSubCategory();
    } else if (action.type === BriefCategoryItemType.TEXT) {
      this.addText();
    } else if (action.type === BriefCategoryItemType.IMAGE) {
      this.addImage(action.args);
    } else if (action.type === BriefCategoryItemType.VIDEO) {
      this.addVideo(action.args);
    } else if (action.type === BriefCategoryItemType.ICON) {
      this.addIcon(action.args);
    }
  }
  // Add question
  addQuestion() {
    const question = new BriefCategoryItem();
    question.id = uuid();
    question.type = BriefCategoryItemType.QUESTION;
    question.order = this.briefCategoryItems.length + 1;
    question.idBriefCategory = this.briefCategory.id;
    question.responseType = undefined;
    question.responseContent = { text: '' };
    this._briefService.addBriefCategoryItem(question).subscribe(item => {
      this.addItemToArray(item);
    });
  }

  // Add subcategory
  addSubCategory() {
    const subCategory = new BriefCategoryItem();
    subCategory.id = uuid();
    subCategory.type = BriefCategoryItemType.SUB_CATEGORY;
    subCategory.order = this.briefCategoryItems.length + 1;
    subCategory.idBriefCategory = this.briefCategory.id;
    subCategory.responseType = undefined;
    this._briefService.addBriefCategoryItem(subCategory).subscribe(item => {
      // console.log(item);
      this.addItemToArray(item);
    });
  }
  // Add text
  addText() {
    // Create text
    const text = new BriefCategoryItem();
    text.id = uuid();
    text.type = BriefCategoryItemType.TEXT;
    text.order = this.briefCategoryItems.length + 1;
    text.idBriefCategory = this.briefCategory.id;
    text.responseType = undefined;
    // call service
    this._briefService.addBriefCategoryItem(text).subscribe(item => {
      this.addItemToArray(item);
    });
  }
  /**
   * Add image
   * @param file : File
   */
  addImage(file) {
    // console.log('add image', file);
    // Image
    const image = new BriefCategoryItem();
    image.type = BriefCategoryItemType.IMAGE;
    image.id = uuid();
    image.order = this.briefCategoryItems.length + 1;
    image.idBriefCategory = this.briefCategory.id;
    // Upload file
    this._briefService.uploadImage(file, image.id).subscribe((categoryItemFile: CategoryItemFile) => {
      image.content = { file: categoryItemFile };
      this._briefService.addBriefCategoryItem(image).subscribe(item => {
        this.addItemToArray(item);
      });
    });
  }

  // Add video
  addVideo(videoArg) {
    // Create text
    const video = new BriefCategoryItem();
    video.id = uuid();
    video.type = BriefCategoryItemType.VIDEO;
    video.order = this.briefCategoryItems.length + 1;
    video.idBriefCategory = this.briefCategory.id;
    video.content = { video: videoArg };

    // call service
    this._briefService.addBriefCategoryItem(video).subscribe(item => {
      this.addItemToArray(item);
    });
  }
  // Add icon
  addIcon(icon: Icon) {
    
    const focusedIn = this.briefCategoryItemsComp.filter(i => i.focusedIn)[0];
    if (focusedIn && focusedIn.briefCategoryItem.type === BriefCategoryItemType.TEXT) {
      // ICON
      const dynamicIcon = new DynamicContent();
      dynamicIcon.id = uuid();
      dynamicIcon.type = 'ICON';
      dynamicIcon.content = icon;
      dynamicIcon.order = 1;
      // TEXT
      const dynamicText = new DynamicContent();
      dynamicText.id = uuid();
      dynamicText.type = 'TEXT';
      dynamicText.content = focusedIn.briefCategoryItem.description;
      dynamicText.order = 2;

      const item = this.briefCategoryItems.filter(i => i.id === focusedIn.briefCategoryItem.id)[0]
      item.content = { dynamicContent: [dynamicIcon, dynamicText] };
      item.type = BriefCategoryItemType.DYNAMIC_CONTENT;
      this._briefService.updateBriefCategoryItem(item).subscribe(response => {
        setTimeout(() => {
      
            $(`#${item.id}`).click();
          
    
        });
      });

    } else {
      // Create text
      const dynamicContent = new BriefCategoryItem();
      dynamicContent.id = uuid();
      dynamicContent.type = BriefCategoryItemType.DYNAMIC_CONTENT;
      dynamicContent.order = this.briefCategoryItems.length + 1;
      dynamicContent.idBriefCategory = this.briefCategory.id;
      const dynamic = new DynamicContent();
      dynamic.id = uuid();
      dynamic.type = 'ICON';
      dynamic.content = icon;
      // Push item
      dynamicContent.content = { dynamicContent: [dynamic] };

      // call service
      this._briefService.addBriefCategoryItem(dynamicContent).subscribe(item => {
        this.addItemToArray(item);
      });
    }

  }
  /**
   * Copy brief category item
   * @param briefCategoryItem 
   */
  onCopyBriefCategoryItem(briefCategoryItem: BriefCategoryItem) {
    // Copy the item
    const copyItem = new BriefCategoryItem();
    copyItem.id = uuid();
    copyItem.type = briefCategoryItem.type;
    copyItem.responseType = briefCategoryItem.responseType;
    // If question
    if (copyItem.type === BriefCategoryItemType.QUESTION) {
      // Process
      this.processCopyOptions(copyItem, briefCategoryItem.responseSettings, briefCategoryItem.responseContent);
      // Settings commons
      copyItem.responseSettings.acceptFiles = { video: false, file: false, audio: false, link: false, image: false };
      // Content files
      copyItem.responseContent.files = { video: undefined, file: undefined, image: undefined, audio: undefined, link: undefined };
    }
    else if (copyItem.type === BriefCategoryItemType.DYNAMIC_CONTENT) {
      // Copy dinamic content
      copyItem.content  = {dynamicContent:[]};
      briefCategoryItem.content.dynamicContent.forEach( content => {
        const dynamicContent = new DynamicContent();
        dynamicContent.id = uuid();
        dynamicContent.type = content.type;
        dynamicContent.content = content.content;
        copyItem.content.dynamicContent.push(dynamicContent);
      })
    }

    // call service
    this._briefService.addBriefCategoryItem(copyItem).subscribe(item => {
      this.addItemToArray(item, true);
    });

  }
  /**
   * Process copy option
   * @param copyItem 
   * @param responseSettings 
   * @param responseContent 
   */
  processCopyOptions(copyItem: BriefCategoryItem,
    responseSettings: ResponseTypeSetting,
    responseContent: ResponseContent) {

    if (
      copyItem.responseType.key === 'text' ||
      copyItem.responseType.key === 'text-large'
    ) {
      // Copy of settings
      const responseSettingsNew: ResponseTypeSetting = {};
      copyItem.responseSettings = responseSettingsNew;
      // Copy of content
      const responseContentNew: ResponseContent = {text:''};
      responseContent.text = responseContent.text;
      copyItem.responseContent = responseContentNew;
    }
    else if (copyItem.responseType.key === 'checkbox' ||
      copyItem.responseType.key === 'radio' ||
      copyItem.responseType.key === 'select' ||
      copyItem.responseType.key === 'yes-no' ||
      copyItem.responseType.key === 'assessment'
    ) {
      const copyOfOptions = [];
      const copyOfOptionsSelected = [];
      // Copy option
      responseSettings.options.forEach((o, index) => {
        const optionsNew = Object.assign(new Option(), o);
        optionsNew.id = uuid();
        copyOfOptions.push(optionsNew);
      });
      // Assign new options
      responseContent.options.forEach((option, index) => {
        const indexSearch = responseContent.options.findIndex(o => o.id === option.id);
        copyOfOptionsSelected.push(copyOfOptions[indexSearch]);

      });

      // Copy of settings
      const responseSettingsNew: ResponseTypeSetting = {}
      responseSettingsNew.options = copyOfOptions;
      copyItem.responseSettings = responseSettingsNew;
      // Copy of content
      const responseContentNew: ResponseContent = {};
      responseContentNew.options = copyOfOptionsSelected;
      copyItem.responseContent = responseContentNew;
    }
    else if (
      copyItem.responseType.key === 'date' ||
      copyItem.responseType.key === 'list' ||
      copyItem.responseType.key === 'ascendent'
    ) {
      const copyOfOptions = [];
      // Assing new id
      responseSettings.options.forEach((o, index) => {
        const optionsNew = Object.assign(new Option(), o);
        optionsNew.id = uuid();
        copyOfOptions.push(optionsNew);
      });
      // Copy of settings
      const responseSettingsNew: ResponseTypeSetting = {}
      responseSettingsNew.options = copyOfOptions;
      copyItem.responseSettings = responseSettingsNew;
      // Copy of content
      const responseContentNew: ResponseContent = {};
      copyItem.responseContent = responseContentNew;
    } else if (copyItem.responseType.key === 'table') {
      // Create copy of table
      const copyTable = new Table();
      copyTable.id = uuid();
      // Columns
      responseSettings.table.columns.forEach((column, columndIndex) => {
        const copyColumn = new TableColumn();
        copyColumn.id = uuid();
        copyColumn.label = column.label;
        copyTable.columns.push(copyColumn);
      });
      // Rows
      responseSettings.table.rows.forEach((row, rowIndex) => {
        // Copy row
        const copyRow = new TableRow();
        copyRow.id = uuid();
        copyRow.label = row.label;
        // Push row
        copyTable.rows.push(copyRow);
        // Each celss
        row.cells.forEach((cell, cellIndex) => {
          // Create cell
          const copyCell = new TableCell();
          copyCell.id = uuid();
          copyCell.type = cell.type;
          copyCell.isNew = cell.isNew;
          copyCell.value = cell.value;
          // Push cell
          copyRow.cells.push(copyCell);
          // cell.id = uuid();
          if (cell.type.key === 'select') {
            cell.options.forEach((optionsCell, optionCellIndex) => {
              // Cell option
              const copyCellOption = new Option();
              copyCellOption.id = uuid();
              copyCellOption.referenceId = copyCell.id;
              copyCellOption.label = optionsCell.label;
              // Push option
              copyCell.options.push(copyCellOption);
            });
          }
        });
      });
      // New settings
      const responseSettingsNew: ResponseTypeSetting = {}
      responseSettingsNew.table = copyTable;
      copyItem.responseSettings = responseSettingsNew;
      // Content
      const responseContentNew: ResponseContent = {};
      copyItem.responseContent = responseContentNew;
    }

  }
  // Add category item array
  addItemToArray(briefCategoryItem: BriefCategoryItem, copyAction = false) {
    const focusedIn = this.briefCategoryItemsComp.filter(i => i.focusedIn)[0];
    if (!focusedIn) {
      // Push if empty
      this.briefCategoryItems.push(briefCategoryItem);
    } else {
      // Get the index of focused category
      const index = $(`#${focusedIn.briefCategoryItem.id}`).index();
      // Splice
      this.briefCategoryItems.splice(index, 0, briefCategoryItem);
    }
    // Order items
    this.orderItems();
    // Trigger click to focus
    setTimeout(() => {
      if (copyAction && briefCategoryItem.type === BriefCategoryItemType.QUESTION) {
        $(`#${briefCategoryItem.id}`).find(`.brief-category-item-content-question`).click();
      } else {
        $(`#${briefCategoryItem.id}`).click();
      }
        
    });
    /* setTimeout(()=>{
      // this.briefCategoryContent.update();
      const scrollParent = this._utilService.getScrollParent($(`#${briefCategoryItem.id}`).get(0),true);
      this._utilService.scrollTo(scrollParent,$(`#${briefCategoryItem.id}`).get(0),);
    });*/
  }
  // Order items
  orderItems() {
    let order = 1;
    let idParent = undefined;
    setTimeout(() => {
      // Get all html topic lines
      $(this.briefCategoryContent.elementRef.nativeElement)
        .find(`.${this.briefCategoryItemClass}`).each((index, item) => {
          // Get node id
          const itemId = item.id;
          // Find item
          const briefCategoryItem = this.briefCategoryItems.filter(i => i.id == itemId)[0];
          if (briefCategoryItem) {
            // Check if subtopic
            if (briefCategoryItem.type === BriefCategoryItemType.SUB_CATEGORY) {
              idParent = briefCategoryItem.id;
            }
            // Check if not subtopic put parent id
            if (briefCategoryItem.type !== BriefCategoryItemType.SUB_CATEGORY) {
              briefCategoryItem.idParent = idParent;
            }
            // Order
            briefCategoryItem.order = order;
          }
          order++;

        });
    });
    // Update order
    this._briefService.updateBriefCategoryItemsOrder(this.briefCategoryItems).subscribe();
  }
  /**
   * Delete brief category item
   * @param briefCategoryItem 
   */
  removeBriefCategoryItem(briefCategoryItem: BriefCategoryItem) {
    this._briefService.removeBriefCategoryItem(briefCategoryItem.id).subscribe(itemRemove => {
      const index = this.briefCategoryItems.indexOf(itemRemove);
      this.briefCategoryItems.splice(index, 1);
      // Delete comments images
      if (briefCategoryItem.type === BriefCategoryItemType.IMAGE) {
        const commentsImage = this.briefCategory.commentThreads.filter(c => c.objectReference === BriefCategoryItemType.IMAGE && c.objectReferenceId === briefCategoryItem.id);
        commentsImage.forEach(c => {
          this._commentThreadService.remove(c.id).subscribe();
        });
      } else if (briefCategoryItem.type === BriefCategoryItemType.VIDEO) {
        const commentsVideo = this.briefCategory.commentThreads.filter(c => c.objectReference === BriefCategoryItemType.VIDEO && c.objectReferenceId === briefCategoryItem.id);
        commentsVideo.forEach(c => {
          this._commentThreadService.remove(c.id).subscribe();
        });
      }
    });
  }
  /**
   * When change image item
   * @param briefCategoryItem 
   */
  onChangeImage(briefCategoryItem: BriefCategoryItem) {
    const commentsImage = this.briefCategory.commentThreads.filter(c =>
      c.objectReference === BriefCategoryItemType.IMAGE && c.objectReferenceId === briefCategoryItem.id);
    commentsImage.forEach(c => {
      this._commentThreadService.remove(c.id).subscribe();
    })
  }
  /**
   * When change video item
   * @param briefCategoryItem 
   */
  onChangeVideo(briefCategoryItem: BriefCategoryItem) {
    const commentsVideo = this.briefCategory.commentThreads.filter(c => c.objectReference === BriefCategoryItemType.VIDEO && c.objectReferenceId === briefCategoryItem.id);
    commentsVideo.forEach(c => {
      this._commentThreadService.remove(c.id).subscribe();
    })
  }
  // #region Sort
  // On sort start
  public onSortStart(event) {
    this._renderer2.addClass(this.briefCategoryContent.elementRef.nativeElement, 'sorting');

    this.sorting = true;

  }
  // On sort end
  onSortEnd(event) {

    this.sorting = false;
    var itemEl = event.item;
    // Focus the element
    itemEl.click();
    this.orderItems();
    setTimeout(() => {
      this._renderer2.removeClass(this.briefCategoryContent.elementRef.nativeElement, 'sorting');
      $('.comment-thread-point-brief').trigger('resize');
    });
  }
  // #endregion

  // #region Comments
  /**
* Show toolbar, force show when force show when selection detected
* @param forceShow 
*/
  showToolbarComments(forceShow = false) {
    const scroll = $(this.briefCategoryContent.elementRef.nativeElement);

    const itemHover = $('.' + this.briefCategoryItemClass + '.' + this.mouseOverClass);
    if (forceShow && this.enableComments) {
      this.forceShowToolbarComments = true;
    }
    if (itemHover.length > 0 && this.enableComments) {
      // top - offsetContainer - (width/2)
      this.toolbarCommentsTop = itemHover.offset().top - scroll.offset().top + scroll.scrollTop() - 25;
      this.isShowToolbarComments = true;
    }
  }

  /**
   * Hide toolbar, force hide when force show when selection detected
   * @param forceHide 
   */
  hideToolbarComments(forceHide = false) {
    if (forceHide) {
      this.forceShowToolbarComments = false;
    }
    this.isShowToolbarComments = false;
  }

  /**
 * On click enable comments
 * @param $event
 */
  onActivateComments(enabled) {
    this.enabledCommentsAction = enabled;

    if (this.enabledCommentsAction) {
      this.focusCategory = false;
      const selection = this._rangyService.self.getSelection()
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      const selectedText = selection.toString();
      this.focusCategory = false;
      if (range && selectedText.length > 0 && this.onMouseUpText(range)) {
        const categoryItem = $(range.commonAncestorContainer).closest(`.${this.briefCategoryItemClass}`);
        let objectReference = undefined;
        let objectReferenceId = undefined;
        if (categoryItem.length) {
          objectReference = this.commentGetClassObjectReference(categoryItem);
          objectReferenceId = categoryItem.attr('id');
        }
        setTimeout(() => {
          this.addCommentSelection(objectReference, objectReferenceId);
        });
      }
    }
  }


  // After add comment
  public afterAddComment() {
    this.enabledCommentsAction = false;
    this.hideToolbarComments(true);
    this._rangyService.clearSelection();
  }
  // Set comment thread number
  private setCommentThreadNumber(commentThread: CommentThread) {

    if (this.briefCategory.commentThreads.length > 0) {
      const arrayLength = this.briefCategory.commentThreads.length;
      const lastComment = this.briefCategory.commentThreads[arrayLength - 1];
      const number = Math.max(lastComment.number + 1, this.briefCategory.commentThreads.length + 1);
      commentThread.number = number;
    } else {
      commentThread.number = this.briefCategory.commentThreads.length + 1;
    }
  }
  /**
   * Generate model of comment selection
   * @param commentId 
   * @param leveId 
   */
  private generateCommentSelection(commentId) {
    const position = this._briefCommentsService.getPositionSelection(commentId);
    const commentThread = new CommentThread();
    commentThread.id = commentId;
    commentThread.event = 'selection';
    commentThread.levelId = 'BRIEF_CATEGORY';
    commentThread.referenceId = this.briefCategory.id;
    commentThread.left = position.left;
    commentThread.top = position.top;
    commentThread.workspaceAccess = this.workspaceAccess;
    commentThread.status = this.commentThreadStatuses.filter(c => c.key === 'in-process')[0];
    commentThread.participantType = this.participantTypes.filter(p => p.key === 'all')[0];
    this.setCommentThreadNumber(commentThread);
    return commentThread;

  }
  /**
   * Generate of comment click
   * @param event 
   * @param eventName 
   */
  private generateCommentClick(event, eventName) {
    const commentThread = new CommentThread();
    commentThread.id = uuid();
    commentThread.event = eventName;
    commentThread.eventObject = event;
    commentThread.levelId = 'BRIEF_CATEGORY';
    commentThread.referenceId = this.briefCategory.id;
    commentThread.workspaceAccess = this.workspaceAccess;
    commentThread.status = this.commentThreadStatuses.filter(c => c.key === 'in-process')[0];
    commentThread.participantType = this.participantTypes.filter(p => p.key === 'all')[0];
    this.setCommentThreadNumber(commentThread);
    return commentThread;
  }
  // Handle comment selection
  private addCommentSelection(objectReference?: any, objectReferenceId?: any) {
    const commentId = uuid();
    const topicSelectionId = this._rangyService.self.
      createClassApplier('comment-thread-selection-' + commentId, {
        tagNames: ['*'],
        normalize: true,
        onElementCreate: (el, applier) => {
          const selectionEl = $(el);
          selectionEl.addClass('comment-thread-selection');
          selectionEl.addClass('active');
          selectionEl.addClass('unprocess');
          selectionEl.addClass('not-saved');
          selectionEl.addClass('status-in-process');
          selectionEl.attr('data-comment-id', commentId);

        }
      });

    topicSelectionId.applyToSelection();
    setTimeout(() => {
      // Create the comment
      const commentThread = this.generateCommentSelection(commentId);
      if (objectReference && objectReferenceId) {
        commentThread.objectReference = objectReference;
        commentThread.objectReferenceId = objectReferenceId;
      }
      // console.log(objectReferenceId);
      // console.log(commentThread,'selection');
      // Create comment service
      this._commentThreadService.create(commentThread).subscribe();
      $(`.comment-thread-selection-${commentId}`).removeClass('unprocess');

    });

  }
  // Add comment click text
  private addCommentClickText(event, target, objectReference?: any, objectReferenceId?: any) {
    // Node text
    const nodeText = target.text();
    // console.log(nodeText);
    // If not empty
    if (nodeText !== '' && nodeText !== '<br>') {
      // Generate id
      const commentId = uuid();
      // Wraper element
      const commentWrapper = `<span class="comment-thread-selection-${commentId} 
                                     comment-thread-selection status-in-process active unprocess not-saved"
                                     data-comment-id="${commentId}"></span>`;
      // wrap  element          
      target.contents().wrap(commentWrapper);
      // Create the comment
      const commentMeetingNote = this.generateCommentSelection(commentId);
      if (objectReference && objectReferenceId) {
        commentMeetingNote.objectReference = objectReference;
        commentMeetingNote.objectReferenceId = objectReferenceId;
      }

      this._commentThreadService.create(commentMeetingNote).subscribe(resp => {
        setTimeout(() => {
          $(`.comment-thread-selection-${commentId}`).removeClass('unprocess');
          // this.afterAddComment();
        })
      });

    }
  }
  // Add comment click image
  private addCommentClickImage(event) {

    const closestContainer = $(this.briefCategoryContent.elementRef.nativeElement);
    // Image line gallery
    const categoryImage = $(event.target).closest(`.brief-category-item-image`);
    const categoryId = categoryImage.attr('id');
    console.log(categoryImage, categoryId);
    // Image
    const image = categoryImage.find(`.gallery-image`);
    // Generate comment at click
    const commentMeetingNote = this.generateCommentClick(event, 'click');
    // Topic Line Item
    const briefCategoryItem = this.briefCategoryItems.filter(i => i.id === categoryId)[0];
    const categoryFile = briefCategoryItem.content.file;
    // Position
    const imageOffset = image.offset();
    const parentOfftset = closestContainer.offset();
    // Image reference
    commentMeetingNote.objectReference = BriefCategoryItemType.IMAGE;
    commentMeetingNote.objectReferenceId = categoryImage.attr('id');
    commentMeetingNote.containerTop = (imageOffset.top - parentOfftset.top) + closestContainer.scrollTop();
    // Size current image
    const currentWidth = image.outerWidth();
    const currentHeight = image.outerHeight();
    commentMeetingNote.containerWidth = currentWidth;
    commentMeetingNote.containerHeight = currentHeight;
    commentMeetingNote.originalContainerWidth = currentWidth;
    commentMeetingNote.originalContainerHeight = currentHeight;
    // Position
    commentMeetingNote.left = event.offsetX;
    commentMeetingNote.top = event.offsetY;
    // Original position
    commentMeetingNote.originalLeft = commentMeetingNote.left * (categoryFile.setting.naturalWidth / currentWidth);
    commentMeetingNote.originalTop = commentMeetingNote.top * (categoryFile.setting.naturalHeight / currentHeight);
    // Add comment
    this._commentThreadService.create(commentMeetingNote).subscribe();
  }
  // Add comment click image
  private addCommentClickVideo(event) {
    console.log(event);
    const closestContainer = $(this.briefCategoryContent.elementRef.nativeElement);
    // Video line 
    const categoyVideo = $(event.target).closest(`.brief-category-item-video`);
    const categoyVideoId = categoyVideo.attr('id');
    // Iframe video
    const iframeVideo = categoyVideo.find(`.brief-video`);
    // Generate comment at click
    const commentMeetingNote = this.generateCommentClick(event, 'click');
    // Topic Line Item
    const briefCategoryItem = this.briefCategoryItems.filter(i => i.id === categoyVideoId)[0];
    // Position
    const videoOffset = iframeVideo.offset();
    const parentOfftset = closestContainer.offset();
    // video reference
    commentMeetingNote.objectReference = BriefCategoryItemType.VIDEO;
    commentMeetingNote.objectReferenceId = briefCategoryItem.id
    commentMeetingNote.containerTop = (videoOffset.top - parentOfftset.top) + closestContainer.scrollTop();
    // Size current image
    const currentWidth = iframeVideo.outerWidth();
    const currentHeight = iframeVideo.outerHeight();
    commentMeetingNote.containerWidth = currentWidth;
    commentMeetingNote.containerHeight = currentHeight;
    commentMeetingNote.originalContainerWidth = currentWidth;
    commentMeetingNote.originalContainerHeight = currentHeight;
    // Position
    commentMeetingNote.left = event.offsetX;
    commentMeetingNote.top = event.offsetY;
    // Original position
    commentMeetingNote.originalLeft = commentMeetingNote.left * (briefCategoryItem.content.video.sizes.width / currentWidth);
    commentMeetingNote.originalTop = commentMeetingNote.top * (briefCategoryItem.content.video.sizes.height / currentHeight);
    // Add comment
    this._commentThreadService.create(commentMeetingNote).subscribe();
  }
  // Handle comment click
  private addCommentClick(event) {
    const target = $(event.target);
    // Title
    if (target.closest(`.brief-text-area-title-text`).length > 0) {
      const text = target.closest(`.brief-text-area-title-text`);
      // Add comment at click
      this.addCommentClickText(event, text);
    }// Description
    else if (target.closest(`.brief-text-area-description-text`).length > 0) {
      const text = target.closest(`.brief-text-area-description-text`);
      // Add comment at click
      this.addCommentClickText(event, text);
    }// Sub category
    else if (target.closest(`.brief-category-item-sub-category-title`).length > 0) {
      const text = target.closest(`.brief-category-item-sub-category-title`);
      // Add comment at click
      this.addCommentClickText(event, text);
    } // Text
    else if (target.closest(`.brief-text-editable`).length > 0) {
      const text = target.closest(`.brief-text-editable`);
      // Add comment at click
      this.addCommentClickText(event, text.find('.link-content'));
    }// Image
    else if (target.closest(`.gallery-image`).length > 0) {
      // Images
      this.addCommentClickImage(event);
    } // Video
    else if (target.closest(`.brief-category-item-video`).length > 0) {
      // Video
      this.addCommentClickVideo(event);
    }

  }
  /**
   * Check if selection is text
   * @param range 
   */
  onMouseUpText(range) {
    let mouseUpText = false;
    const parentEl = $(range.commonAncestorContainer).closest(`.brief-category-inner`);
    if (parentEl.length > 0) {

      // If selection has one line
      const topicLine = $(range.commonAncestorContainer);
      if (
        // Title
        topicLine.closest('.brief-text-area-title-text').length > 0 ||
        // Description
        topicLine.closest('.brief-text-area-description-text').length > 0 ||
        // Sub category
        topicLine.closest('.brief-category-item-sub-category-title').length > 0 ||
        // Text
        topicLine.closest('.brief-text-editable').length > 0
      ) {
        mouseUpText = true;
      }

    }
    return mouseUpText;
  }
  private commentGetClassObjectReference(categoryItem) {
    let objectReference = undefined;
    if (categoryItem.hasClass('brief-category-item-question')) {
      objectReference = 'question';
    } else if (categoryItem.hasClass('brief-category-item-text')) {
      objectReference = 'text';
    } else if (categoryItem.hasClass('brief-category-item-sub-category')) {
      objectReference = 'sub-category';
    } else if (categoryItem.hasClass('brief-category-item-video')) {
      objectReference = 'video';
    } else if (categoryItem.hasClass('brief-category-item-image')) {
      objectReference = 'image';
    }

    return objectReference;
  }
  // Mouse up
  @HostListener('window:mouseup', ['$event']) onMouseUp(event) {
    // Get selection elements
    const selection = this._rangyService.self.getSelection()
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const selectedText = selection.toString();
    // Has comment not saved
    const commentNotSaved = this.briefCategory.commentThreads.filter(c => !c.saved).length === 0;
    if (this.enabledCommentsAction && commentNotSaved) {
      // 
      if (range && selectedText.length > 0 && this.onMouseUpText(range)) {
        const categoryItem = $(range.commonAncestorContainer).closest(`.${this.briefCategoryItemClass}`);
        let objectReference = undefined;
        let objectReferenceId = undefined;
        if (categoryItem.length) {
          objectReference = this.commentGetClassObjectReference(categoryItem);
          objectReferenceId = categoryItem.attr('id');
        }
        // Add comment selection
        this.addCommentSelection(objectReference, objectReferenceId);
      } else if ($(event.target).closest(`.brief-category-inner`).length > 0) {
        // Event left click
        if (event.which === 1) {
          this.addCommentClick(event);
        }
      } // else {
      // this.hideToolbarComments(true);
      // this.onActivateComments(false);
      //}
    } else {
      // If not enabled comments
      if (range && selectedText.length > 0 && this.onMouseUpText(range)) {
        this.showToolbarComments(true);
      } else {
        this.hideToolbarComments(true);
      }
    }

  }

  // #endregion

  // #region Givebacks

  // On hover item
  onHoverBriefCategoryItem(briefCategoryItem: BriefCategoryItem) {
    this.briefCategoryItemHover = briefCategoryItem;
    if (this.briefCategoryItemHover.type === BriefCategoryItemType.QUESTION) {
      if (this._briefWorkflowService.checkIfResponseIsFilled(this.briefCategoryItemHover)) {
        if (!this.briefCategoryItemHover.giveback.id) {
          this.isOverQuestion = true;
        } else {
          this.isOverQuestion = false;
        }

      } else {
        this.isOverQuestion = false;
      }

    } else {
      this.isOverQuestion = false;
    }
  }
  // Show toolbar returns
  public showToolbarGiveback() {
    this.isShowToolbarGiveback = true;
  }
  // Hide toolbar returns
  public hideToolbarGiveback() {
    this.isShowToolbarGiveback = false;
  }
  /**
   * Process show
   * @param briefCategoryItem 
   */
  processGivebackShow(briefCategoryItem: BriefCategoryItem) {
    const giveback = briefCategoryItem.giveback;
    giveback.categoryTitle = this.briefCategory.title;
    giveback.briefCategoryItemId = briefCategoryItem.id;
    giveback.briefCategoryId = this.briefCategory.id;

    if (briefCategoryItem.idParent) {
      const subcategory = this.briefCategoryItems.filter(i => i.id === briefCategoryItem.idParent)[0];
      giveback.subCategoryTitle = subcategory.title;
    }
    return giveback;
  }

  // Public add return
  addGiveBack() {
    const giveback = this.processGivebackShow(this.briefCategoryItemHover);
    this.onShowGiveBack.emit(giveback)
    // this.briefGivebackSidenav.showSidenav(this.briefCategoryItemHover, this.briefCategory.title, subCategoryTitle);
  }
  // On show givebacks
  onShowGivebackFn(briefCategoryItem: BriefCategoryItem) {
    const giveback = this.processGivebackShow(briefCategoryItem);
    this.onShowGiveBack.emit(giveback)
    // this.briefGivebackSidenav.showSidenav(briefCategoryItem, this.briefCategory.title, subCategoryTitle);
  }

  // #endregion
  // #region Tutorial 
  onChangeResponseTypeEvent(briefCategoryItem: BriefCategoryItem) {
    if (this.hasTourResponse) {
      // Comment the tutorial response
      this.briefTutorialResponse.tourResponse[0].target = '#question-reply-title-' + briefCategoryItem.id;
      this.briefTutorialResponse.tourResponse[0].pulseTarget = '#pulse-target-question-title-' + briefCategoryItem.id;
      this.briefTutorialResponse.tourResponse[1].target = '#question-reply-title-' + briefCategoryItem.id;
      setTimeout(() => {
        this.briefTutorialResponse.tourResponseComp.startTour();
      }, 350);

    }
  }
  // Tutorial response ond end
  tutorialResponseOnEnd() {
    this.onTutorialResponseEnd.emit();
  }
  // Tutorial dont show again
  tutorialResponseOnDontShowAgain() {
    console.log('Implement dont show again tutorial response');
  }
  // #endregion
  /**
 * Window click
 * @param event
 */
  @HostListener('window:click', ['$event']) onWindowClick(event) {
    const target = $(event.target);
    if (
      target.closest('.brief-category-inner').length === 0 &&
      target.closest('.alert-disabled-trigger').length === 0 &&
      target.closest('.category-item-floating-menu').length === 0 &&
      target.closest('.picker').length === 0 &&
      target.closest('.tour-overlay').length === 0 &&
      target.closest('.tour-popup').length === 0


    ) {
      // Hide toolbar
      this.focusCategory = false;
      this.briefToolbarActions.focusToolbar(this.focusCategory, null);
      // Remove focus all elements
      this.briefCategoryItemsComp.forEach(c => {
        c.focusedIn = false;
        if (c instanceof BriefCategoryItemQuestionComponent) {
          c.focusQuestion = false;
          c.focusResponse = false;
          // If table update is new
          if (c.briefCategoryItem.responseType && c.briefCategoryItem.responseType.key === 'table') {
            if (c.briefCategoryItem.responseSettings.table.isNew) {
              c.briefCategoryItem.responseSettings.table.isNew = false;
              c.briefCategoryItem.responseSettings.table.rows.forEach(r => {
                r.cells.forEach(c => {
                  c.isNew = false;
                });
              });
              // Update
              c.onResponseSettingsChange(c.briefCategoryItem.responseSettings);
            }
          }
        }
      });
    }

    setTimeout(() => {
      $('.comment-thread-point-brief').trigger('resize');
    });
  }
  /**
   * Window resize
   * @param event 
   */
  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    setTimeout(() => {
      this.briefCategoryItemsComp.filter(c => c instanceof BriefCategoryItemVideoComponent).forEach(video => {
        (<BriefCategoryItemVideoComponent>video).resizeVideo();
      });
    }, 300);

  }

  // Mouse over
  @HostListener('mouseover', ['$event']) onMouseOver(event) {
    const target = $(event.target).closest('.' + this.briefCategoryItemClass);
    $('.' + this.briefCategoryItemClass).removeClass(this.mouseOverClass);
    target.addClass(this.mouseOverClass);

  }
  // Mouse move
  @HostListener('mousemove', ['$event']) onMouseMove(event) {

    let mouseSide = '';
    const parent = $('.brief-category-content');
    const target = $(event.target);
    if ((event.pageX - parent.offset().left) < parent.width() / 2) {
      mouseSide = 'L';
    } else {
      mouseSide = 'R';
    }
    // If mouse over right show toolbar of comments
    if (mouseSide === 'R') {
      // console.log('show sidebar');
      this.showToolbarComments();
      this.showToolbarGiveback();
      // If mouse over lef show toolbar of actions
    } else if (mouseSide === 'L') {
      this.hideToolbarComments();
      this.hideToolbarGiveback();
    }

  }
  // Mouse leave
  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {
    this.hideToolbarComments();
    this.hideToolbarGiveback();
  }

  ngOnDestroy() {
    if (this.subscriptionCategoriesItems) {
      this.subscriptionCategoriesItems.unsubscribe();
    }
    if (this.subscriptionCommentThreadFilter) {
      this.subscriptionCommentThreadFilter.unsubscribe();
    }
    if (this.subscriptionComments) {
      this.subscriptionComments.unsubscribe();
    }
    if (this.categoryChangesObserver) {
      this.categoryChangesObserver.disconnect();
    }
  }
}
