import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterContentInit, Input, EventEmitter, Output } from '@angular/core';
import { BriefCategoryItemDefaultComponent } from '../brief-category-item-default/brief-category-item-default.component';
import { UtilService } from 'src/app/services/utils/util.service';
import { YoutubeStrategyService } from 'src/app/services/youtube/youtube-strategy.service';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { ToastrService } from 'ngx-toastr';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { CommentThread } from 'src/app/models/comments/comment-thread';

@Component({
  selector: '[app-brief-category-item-video]',
  templateUrl: './brief-category-item-video.component.html',
  styleUrls: ['./brief-category-item-video.component.scss']
})
export class BriefCategoryItemVideoComponent
  extends BriefCategoryItemDefaultComponent
  implements OnInit, AfterContentInit {
  // Public vars
  public _elementRef: ElementRef;
  public calculatedWidth = 0;
  public calculatedHeight = 0;
  // Services
  private _youtubeService;
  private _briefService;
  // Inputs
  @Input() commentThreads: CommentThread[] = [];
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  // Outpus 
  @Output() onChangeVideo = new EventEmitter();
  // View child
  @ViewChild('iframeVideo') iframeVideo: ElementRef;

  constructor(
    private renderer2: Renderer2,
     elementRef: ElementRef,
    private _utilService: UtilService,
    private _youtubeStrageyService: YoutubeStrategyService,
    private _briefStrategyService: BriefStrategyService,
    private _toastrService: ToastrService
  ) {
    super(elementRef);
    this._elementRef = elementRef;
    this._youtubeService = this._youtubeStrageyService.getService();
    this._briefService = this._briefStrategyService.getService();
  }
  // Init
  ngOnInit() {
    super.ngOnInit();
    this.renderer2.setProperty(this.iframeVideo.nativeElement, 'src', this.briefCategoryItem.content.video.url);

  }
  ngAfterContentInit() {
    this.resizeVideo();
  }

  resizeVideo() {
    const maxWidth = this._elementRef.nativeElement.clientWidth - 40;  
    const widthRatio = this.briefCategoryItem.content.video.sizes.width / maxWidth;
    this.calculatedWidth = this.briefCategoryItem.content.video.sizes.width / widthRatio;
    this.calculatedHeight = this.briefCategoryItem.content.video.sizes.height / widthRatio;

    // Iframe
    this.iframeVideo.nativeElement.width = this.calculatedWidth;
    this.iframeVideo.nativeElement.height = this.calculatedHeight;

  }
  // Change video
  async changeVideo() {
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
          this.briefCategoryItem.content.video = video;
          this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(item => {
            this.ngOnInit();
            this.resizeVideo();
            this.onChangeVideo.emit(this.briefCategoryItem);
          });

        } else {
          this._toastrService.info('Link de youtube inválido');
        }
      } else {
        this._toastrService.info('Link de youtube inválido');
      }
    }
  }
}
