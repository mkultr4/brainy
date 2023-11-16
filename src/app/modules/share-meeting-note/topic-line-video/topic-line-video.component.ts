import { Component, OnInit, Input, Output, ViewChild, ElementRef, Renderer2, EventEmitter, HostBinding } from '@angular/core';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';
import { CommentThread } from 'src/app/models/comments/comment-thread';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { ParticipantType } from 'src/app/models/participants/participant-type';

@Component({
  selector: '[app-topic-line-video]',
  templateUrl: './topic-line-video.component.html',
  styleUrls: ['./topic-line-video.component.scss']
})
export class TopicLineVideoComponent implements OnInit {


  // public videoId:string;
  public urlVideo: string;
  public shortUrl: string;
  public calculatedWidth = 0;
  public calculatedHeight = 0;
  // Inputs
  @HostBinding('class.editable') @Input() editable: boolean = false;
  @HostBinding('class.enable-comments') @Input() enableComments: boolean = false;
  @Input() topicLineItem: TopicLineItem;
  @Input() commentThreads: CommentThread[] = [];
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  @Input() sorting = false;
  // Outputs
  @Output() videoOnRemove = new EventEmitter();
  // View child
  @ViewChild('iframeVideo') iframeVideo: ElementRef;
  // Constuctor
  constructor(public elementRef: ElementRef, private renderer2: Renderer2) {

  }

  ngOnInit() {
    this.renderer2.setProperty(this.iframeVideo.nativeElement, 'src', this.topicLineItem.content.video.url);
    this.resizeVideo();
  }
  /**
   * Remove video
   * @param $event 
   */
  remove($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.elementRef.nativeElement.remove();
  }

  resizeVideo() {
    const maxWidth = $(this.elementRef.nativeElement).find('.topic-line-video-wrapper').width();
    const widthRatio = this.topicLineItem.content.video.sizes.width / maxWidth;

    this.calculatedWidth = this.topicLineItem.content.video.sizes.width / widthRatio;
    this.calculatedHeight = this.topicLineItem.content.video.sizes.height / widthRatio;

    // Iframe
    this.iframeVideo.nativeElement.width = this.calculatedWidth;
    this.iframeVideo.nativeElement.height = this.calculatedHeight;
    

  }

}
