import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { MeetingNoteStrategyService } from 'src/app/services/meeting-note/meeting-note-strategy.service';
import { FileUtilService } from 'src/app/services/utils/file-util.service';
import { ToastrService } from 'ngx-toastr';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';
import { TopicFile } from 'src/app/models/meeting-note/topic-file';
import { CommentThread } from 'src/app/models/comments/comment-thread';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { TopicLineImageComponent } from '../topic-line-image/topic-line-image.component';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';

@Component({
  selector: '[app-topic-line-image-gallery]',
  templateUrl: './topic-line-image-gallery.component.html',
  styleUrls: ['./topic-line-image-gallery.component.scss']
})
export class TopicLineImageGalleryComponent implements OnInit {

  // Service
  public _meetingNoteService;
  private _commentThreadService;
  // Input
  @Input() editable: boolean = false;
  @Input() enableComments: boolean = false;
  @Input() sorting = false;
  @Input() topicLineItem: TopicLineItem;
  @Input() commentThreads: CommentThread[];
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  // Output
  @Output() galleryOnRemove = new EventEmitter();
  @Output() galleryOnResize = new EventEmitter();
  // Query Lis
  @ViewChildren(TopicLineImageComponent) galleryComp: QueryList<TopicLineImageComponent>;
  constructor(
    public elementRef: ElementRef,
    public _meetingNoteStrategyService: MeetingNoteStrategyService,
    public _commentThreadStrategyService: CommentThreadStrategyService,
    private _fileUtilService: FileUtilService,
    private _toastrService: ToastrService

  ) {
    // Services
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
    this._commentThreadService = this._commentThreadStrategyService.getService();

  }
  // Init
  ngOnInit() { }
  // After view init
  ngAfterViewInit() {
    this.resize();
  }
  /**
   * On remove image gallery
   * @param imageId 
   */
  async onRemoveImage(topicFile: TopicFile) {
    this._meetingNoteService.deleteImageGallery(topicFile.id).subscribe(() => {
      this.removeCommentsImage(topicFile.id);
      const index = this.topicLineItem.content.gallery.indexOf(topicFile);
      this.topicLineItem.content.gallery.splice(index, 1);

      if (this.topicLineItem.content.gallery.length === 0) {
        this.elementRef.nativeElement.remove();
      } else {
        // this._topicEditorService.updateTopicLineItem(this.topicLineItem).subscribe();
      }

    })
  }
  /**
   * On change image
   * @param data
   */
  async onChangeImage(data) {
    const file = data.file;
    const imageGallery = data.imageGallery;
    if (this.validateImage(file)) {
      this._meetingNoteService.updateImageGallery(imageGallery, file).subscribe(() => {
        this.topicLineItem.content.gallery.forEach((i, index) => {
          if (i.id === imageGallery.id) {
            this.topicLineItem.content.gallery[index] = imageGallery;
            this.removeCommentsImage(imageGallery.id);
          }
          setTimeout(() => {
            this.resize();
          })
        })
      })
    }
  }

  private async removeCommentsImage(imageId) {
    const imageComp = this.galleryComp.filter(i => i.imageGallery.id === imageId)[0];
    if (imageComp) {
      // Each comments and remove
      imageComp.commentThreads.forEach(async (c) => {
        // Observable 
        const commentThreadObs = this._commentThreadService.remove(c.id);
        // Promise
        await commentThreadObs.toPromise().then(resp => { return resp; });
      });
    }
  }
  private validateImage(file) {
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
    } else {
      valid = false;
    }

    return valid;
  }
  /**
   * Resize
   */
  resize() {
    if (this.topicLineItem.content.gallery.length === 1) {
      $(this.elementRef.nativeElement).removeClass('topic-gallery-n-items')
      $(this.elementRef.nativeElement).find('.topic-gallery-item ').css({ 'flex': '1 1 0%' });
      // $(this.elementRef.nativeElement).find('.topic-gallery-item ').find('a').focus();
    } else {
      $(this.elementRef.nativeElement).addClass('topic-gallery-n-items')
      this.topicLineItem.content.gallery.forEach((image, index) => {
        const topicGalleryItem = $('#' + image.id);
        console.log(image);
        var aspect = image.setting.naturalWidth / image.setting.naturalHeight;
        topicGalleryItem.css({ flex: aspect.toFixed(4).toString() + ' 1 0%' });
      });
    }
    setTimeout(() => {
      this.galleryOnResize.emit();
    })
  }

  ngOnDestroy() {
  }
}
