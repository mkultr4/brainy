import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, Renderer2, HostListener } from '@angular/core';
import { TopicFile } from 'src/app/models/meeting-note/topic-file';
import { CommentThread } from 'src/app/models/comments/comment-thread';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';

@Component({
  selector: '[app-topic-line-image]',
  templateUrl: './topic-line-image.component.html',
  styleUrls: ['./topic-line-image.component.scss']
})
export class TopicLineImageComponent implements OnInit {
  //Image Gallery
  @Input() public imageGallery: TopicFile;
  @Input() commentThreads: CommentThread[] = [];
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  @Input() editable: boolean = false;
  @Input() sorting = false;
  @Input() enableComments: boolean = false;
  
  //On remove
  @Output() imageOnRemove = new EventEmitter();
  @Output() imageOnChange = new EventEmitter();
  //Img Ref
  @ViewChild('imgRef') img: ElementRef;

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    // Sets the value of the element

  }
  link() {
  }
  @HostListener('window:click', ['$event']) onWindowClick(event) {
    var target = $(event.target);

    if (target[0] !== this.elementRef.nativeElement
      && target.closest('.topic-gallery-item')[0] !== this.elementRef.nativeElement
      && target.closest('#main-toolbar-menu-topic').length === 0
    ) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'topic-gallery-item-selected')
    }
  }
  @HostListener('click', ['$event']) onClick($event) {
    console.log('click image');
    if (this.editable) {
      setTimeout(() => {
        this.renderer.addClass(this.elementRef.nativeElement, 'topic-gallery-item-selected')
        //$(this.elementRef.nativeElement).closest('.topic-line').focus();
      })


    }
  }

  remove($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.imageOnRemove.emit(this.imageGallery);
  }
  changeImage(file) {
    this.imageOnChange.emit({ imageGallery: this.imageGallery, file: file });
  }
  ngOnDestroy() {
    /*if(this.subsEditable){
      this.subsEditable.unsubscribe();
    }*/
  }

}
