import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/services/utils/util.service';
import { ToastrService } from 'ngx-toastr';
import { FileUtilService } from 'src/app/services/utils/file-util.service';
import { YoutubeStrategyService } from 'src/app/services/youtube/youtube-strategy.service';
import { BriefToolbarAction } from '../models/brief-toolbar-action';
import { BriefCategoryItemType } from 'src/app/models/brief/brief-category-item-type';
import { ContextualBriefIconComponent } from '../brief-category-content/contextual-brief-icon/contextual-brief-icon.component';
import { Icon } from 'src/app/models/icons/Icon';

@Component({
  selector: 'app-brief-toolbar-menu-actions',
  templateUrl: './brief-toolbar-menu-actions.component.html',
  styleUrls: ['./brief-toolbar-menu-actions.component.scss'],
  providers: [YoutubeStrategyService]
})
export class BriefToolbarMenuActionsComponent implements OnInit {

  // Public vars
  public toolbarVisible = false;  
  public showToolbar = false;
  public toolbarTop = 0;
  public isComment = false;
  public heightToolbar = 40;
  // Services
  private _youtubeService;
  // Inputs
  @Input() enableComments;
  @Input() forceShow = false;
  @Input() editable;
  @Input() empty = false;
  @Input() offsetTop = 40;
  @Input() scrollId = '#scroll-category-content';
  @Input() template = false;
  // Outputs
  @Output() toolbarOnAction = new EventEmitter();
  // View child
  @ViewChild('contextualAddIcon') contextualAddIcon: ContextualBriefIconComponent;

  constructor(
    private _utilService: UtilService,
    private _toastrService: ToastrService,
    private _fileUtilService: FileUtilService,
    private _youtubeStrategyService: YoutubeStrategyService
  ) {
    this._youtubeService = this._youtubeStrategyService.getService();
  }

  ngOnInit() {
  }

  toggleToolbar($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.showToolbar = !this.showToolbar;
  }
  /**
   * Focus toolbar
   * @param focus 
   * @param elemet 
   */
  focusToolbar(focus, element) {
    if (focus) {
      this.posisionated(element);
      setTimeout(() => {
        this.showToolbar = false;
        this.toolbarVisible = focus;
      })
    } else {
      this.showToolbar = false;
      this.toolbarVisible = focus;
      setTimeout(() => {
        this.posisionatedBottom();
      })
      
    }
  }
  posisionated(element) {
    // Scroll top
    if (element) {
      const scroll = $(this.scrollId);
      const scrollTop = scroll.scrollTop();
      // Jquery element
      const $element = $(element);
      // Position 
      let top = 15;
      let positionTop = $element.position().top - 15;
      top = positionTop;
      // Toolbar top
      this.toolbarTop = top;
    } else {
      this.toolbarTop = -15;
    }

  }

  posisionatedBottom(){
    const height = $('.brief-category-inner').height();
    this.toolbarTop = height;
  }
  /**
   * Add item
   * @param $event
   * @param type
   */
  async addItem($event, type) {
    console.log($event);
    $event.preventDefault();
    $event.stopPropagation();
    if (type === BriefCategoryItemType.VIDEO) {
      const url = prompt('Ingresa el vínculo del video de youtube: ', '');
      if (url) {
        const videoId = this._utilService.matchYoutubeUrl(url);
        if (videoId) {
          const urlVideo = "https://www.youtube.com/embed/" + videoId + "?amp;start=0&amp;rel=0";
          const shortUrl = "https://youtu.be/" + videoId;
          const youtubeObservable = this._youtubeService.getYoutubeApiV3Information(videoId, 'snippet,player');
          let youtubeApiResponse = await youtubeObservable.toPromise().then(resp => { return resp; });
          if (youtubeApiResponse.items.length > 0) {
            const videoSizes = this._youtubeService.resolveVideoSizes(youtubeApiResponse.items[0]);
            console.log(videoSizes);
            const video = { url: urlVideo, shortUrl: shortUrl, sizes: videoSizes };
            const toolbarAction = new BriefToolbarAction(BriefCategoryItemType.VIDEO, video);
            this.toolbarOnAction.emit(toolbarAction);
            this.showToolbar = false;
          } else {
            this._toastrService.info('Link de youtube inválido');
          }
        } else {
          this._toastrService.info('Link de youtube inválido');
        }
      }
    } else if (type === BriefCategoryItemType.SUB_CATEGORY) {
      const toolbarAction = new BriefToolbarAction(BriefCategoryItemType.SUB_CATEGORY, undefined);
      this.toolbarOnAction.emit(toolbarAction);
      this.showToolbar = false;
    } else if (type === BriefCategoryItemType.TEXT) {
      const toolbarAction = new BriefToolbarAction(BriefCategoryItemType.TEXT, undefined);
      this.toolbarOnAction.emit(toolbarAction);
      this.showToolbar = false;
    } else if (type === BriefCategoryItemType.QUESTION) {
      const toolbarAction = new BriefToolbarAction(BriefCategoryItemType.QUESTION, undefined);
      this.toolbarOnAction.emit(toolbarAction);
      this.showToolbar = false;
    } else if (type === BriefCategoryItemType.ICON) {


      // this.contextualAddIcon.modal.showModal();
    }
  }
  /**
   * Choose Image
   * @param file
   */
  chooseImage(file: File) {
    let valid = true;
    if (file && file.size > 0) {
      if (!this._fileUtilService.validateFileExtension(file, 'image')) {
        this._toastrService.info('Formato de archivo no aceptado');
        valid = false;
      }
      if (!this._fileUtilService.validateFileSize(file, 'image')) {
        this._toastrService.info('Tamaño de archivo muy grande');
        valid = false;
      }
      if (valid) {
        const toolbarAction = new BriefToolbarAction(BriefCategoryItemType.IMAGE, file);
        this.toolbarOnAction.emit(toolbarAction);

      }
    }
  }
  /**
   * On show contextual icon
   * @param $event 
   */
  onShowContextualIcon($event) {
    console.log('on show icon contextual');
  }
  /**
   * On change icon
   * @param $event 
   */
  onChangeIco(icon: Icon) {
    const toolbarAction = new BriefToolbarAction(BriefCategoryItemType.ICON, icon);
    this.toolbarOnAction.emit(toolbarAction);
    this.showToolbar = false;

  }
  /**
   * Window click
   * @param event 
   */
  @HostListener('window:click', ['$event']) onWindowClick(event) {
    const target = $(event.target);
    if (
      target.closest('#main-toolbar-menu-category').length === 0
    ) {
      this.showToolbar = false;
    }
  }


}
