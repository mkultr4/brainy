import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../../../services/utils/util.service';
import { ToastrService } from 'ngx-toastr';
import { FileUtilService } from '../../../../services/utils/file-util.service';
import { MeetingNoteToolbarAction } from '../../models/meeting-note-toolbar-action';
import { YoutubeStrategyService } from '../../../../../app/services/youtube/youtube-strategy.service';

@Component({
  selector: 'app-topic-editor-toolbar',
  templateUrl: './topic-editor-toolbar.component.html',
  styleUrls: ['./topic-editor-toolbar.component.scss'],
  providers: [YoutubeStrategyService]
})
export class TopicEditorToolbarComponent implements OnInit {
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
  @Input() editable;
  @Input() offsetTop = 40;
  @Input() scrollId = '#scroll-topic-description';
  // Outputs
  @Output() toolbarOnAction = new EventEmitter();

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
    }
  }
  posisionated(element) {
    // Scroll top
    const scroll = $(this.scrollId);
    const scrollTop = scroll.scrollTop();

    // Jquery element
    const $element = $(element);
    // Position 
    let top = 0;

    let positionTop = $element.offset().top - scroll.offset().top;
    top = positionTop + scrollTop - 15;

    this.toolbarTop = top;

  }
  /**
   * Add item
   * @param $event
   * @param type
   */
  async addItem($event, type) {
    console.log(type);
    $event.preventDefault();
    $event.stopPropagation();

    if (type === 'video') {
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
            const toolbarAction = new MeetingNoteToolbarAction('video', video);
            this.toolbarOnAction.emit(toolbarAction);
            this.showToolbar = false;
          } else {
            this._toastrService.info('Link de youtube inválido');
          }
        } else {
          this._toastrService.info('Link de youtube inválido');
        }
      }
    } else if (type === 'sub-topic') {
      console.log('add sub topic');
      const toolbarAction = new MeetingNoteToolbarAction('sub-topic', undefined);
      this.toolbarOnAction.emit(toolbarAction);
      this.showToolbar = false;
    } else if (type === 'text') {
      const toolbarAction = new MeetingNoteToolbarAction('text', undefined);
      this.toolbarOnAction.emit(toolbarAction);
      this.showToolbar = false;
    } else if (type === 'link') {
      let url = prompt('Enter the link here: ', '');
      if (url && this._utilService.validateUrl(url)) {
        if (!/^(?:http(s)?:\/\/)/.test(url)) {
          url = 'http://' + url;
        }
        const toolbarAction = new MeetingNoteToolbarAction('link', url);
        this.toolbarOnAction.emit(toolbarAction);
        this.showToolbar = false;

      } else {
        this._toastrService.info('Url no válida');
      }
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
        this.showToolbar = false;
        const toolbarAction = new MeetingNoteToolbarAction('image', file);
        this.toolbarOnAction.emit(toolbarAction);

      }
    }
  }
  /**
   * 
   * @param file
   */
  chooseFile(file: File) {
    let valid = true;
    if (file && file.size > 0) {
      if (!this._fileUtilService.validateFileSize(file, 'image', 50)) {
        this._toastrService.info('Tamaño de archivo muy grande');
        valid = false;
      }
      if (valid) {

        const toolbarAction = new MeetingNoteToolbarAction('attachment', file);
        this.toolbarOnAction.emit(toolbarAction);
      }
    }
  }




}
