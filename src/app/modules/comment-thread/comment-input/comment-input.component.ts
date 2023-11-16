import { Component, OnInit, OnChanges, Output, Input, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { CONF_FILES } from '../../../config/app.config';
import { CommentThreadMessage } from '../../../models/comments/comment-thread-message';
import { FileUtilService } from '../../../services/utils/file-util.service';
import { IframelyStrategyService } from '../../../services/iframely/iframely-strategy.service';
import { CommentLink } from '../../../models/comments/comment-link';


@Component({
  selector: 'app-comment-input,[app-comment-input]',
  templateUrl: './comment-input.component.html',
  styleUrls: ['./comment-input.component.scss']
})
export class CommentInputComponent implements OnInit {
  // Text
  public isCommentTextFocus = false;
  public hasFile = false;
  public commentInputDragHover = false;
  public imageExtensions = CONF_FILES.imageExtensions;
  public maxFileSizeImage = CONF_FILES.maxFileSizeImage;
  public regexUrl =  /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  // Services
  private _iframelyService
  // Inputs
  @Input() comment: CommentThreadMessage = new CommentThreadMessage();
  @Input() set commentAudio(commentAudio: any) {
    if (commentAudio) {
      if (this.hasFile) {
        this.hasFile = false;
        this.comment.commentFile = undefined;
      }
    }
  }
  @Input() commentMention: CommentThreadMessage = undefined;
  @Input() autoFocus = false;
  // Outputs
  @Output() inputOnStartRecordAction = new EventEmitter();
  @Output() inputOnChange = new EventEmitter();
  @Output() inputOnRemoveMention = new EventEmitter();
  // View child
  @ViewChild('textArea') textArea: ElementRef;

  constructor(
    private _fileUtilService: FileUtilService,
    private _toastrService: ToastrService,
    private _iframelyStrategyService: IframelyStrategyService
  ) {
    this._iframelyService = this._iframelyStrategyService.getService();
  }



  ngOnInit() {
  }
  // Remove mention
  removeMention() {
    this.commentMention = undefined;
    this.inputOnRemoveMention.emit(this.commentMention);
  }
  /**
   * Reset
   */
  reset() {
    this.comment.type = 'text';
    this.comment.commentAudio = undefined;
    this.hasFile = false;
    this.comment.commentFile = undefined;
    this.comment.commentText = '';
  }
  /*************************************************************************
                    COMMENT TYPE TEXT
  **************************************************************************/
  commnetTextFocus() {
    this.isCommentTextFocus = true;
    this.inputOnChange.emit();
  }
  commnetTextBlur() {
    this.isCommentTextFocus = false;
  }
  /**
   * Change text
   * @param text
   */
  changeText(text) {
    const urlRegex = new RegExp(this.regexUrl);
    if (urlRegex.test(text)) {
      const match = text.match(this.regexUrl);
      const url = match[0];
      if (!this.comment.commentLink || url !== this.comment.commentLink.url) {
        this._iframelyService.getUrlInformation(url).subscribe(info => {
          console.log('_iframelyService',info);
          this.comment.commentLink = new CommentLink();
          this.comment.commentLink.url = url;
          this.comment.commentLink.title = info.title;
          this.comment.commentLink.description = info.description;
          this.comment.commentLink.providerName = info.provider_name;
          this.comment.commentLink.thumbnailUrl = info.thumbnail_url;
          this.comment.commentLink.thumbnailHeight = info.thumbnail_height;
          this.comment.commentLink.thumbnailWidth = info.thumbnail_width;
        },error => {
          console.log('cannot get url');
          console.log(error);
        })

      }
    }

  }
  linkOnRemove(){
    console.log('linkOnRemove');
    this.comment.commentLink =  undefined;
  }
  /*************************************************************************
                    COMMENT TYPE FILE
  **************************************************************************/

  chooseFile(readFile: File) {
    console.log(readFile);
    if (readFile) {
      let valid = true;
      const file = readFile;
      if (!this._fileUtilService.validateFileExtension(file, 'image')) {
        valid = false;
        this._toastrService.info('Solo puedes subir archivos SVG, JPG, PNG y TIFF.');
      }
      if (!this._fileUtilService.validateFileSize(file, 'image', '30')) {
        valid = false;
        this._toastrService.info('El tamaño maximo de imagen es de ' + this._fileUtilService.maxFileSizeImage + 'MB');
      }
      if (valid) {
        const url = window.URL.createObjectURL(file);
        //          this.briefImage = url;
        this.hasFile = true;
        this.comment.type = 'file';
        this.comment.mimeType = 'image';
        this.comment.commentFile = file;
        this.comment.commentFileUrl = url;
        this.comment.commentFileName = file.name;
      }

    }



  }

  removeFile() {
    this.comment.type = 'text';
    this.hasFile = false;
    this.comment.commentFile = undefined;
  }
  dragOver($event) {
    // console.log($event);
    this.commentInputDragHover = true;
  }
  dragLeave($event) {
    this.commentInputDragHover = false;
  }
  /*************************************************************************
                    COMMENT TYPE AUDIO
  **************************************************************************/
  startRecordAction() {
    // On change input
    this.inputOnChange.emit();
    this.inputOnStartRecordAction.emit(true);
  }
  cancelRecord() {
    this.comment.type = 'text';
    this.comment.commentAudio = undefined;
  }


}
