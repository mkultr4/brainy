import { Component, OnInit, Input, AfterViewInit, OnDestroy, Inject, HostListener, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { FeedbackVersionsSidenavComponent } from '../feedback-versions-sidenav/feedback-versions-sidenav.component';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { ParticipantType } from '../../../models/participants/participant-type';
import { ComparedVersion, FeedbackVersionComunicationService } from '../services/feedback-version-comunication.service';
import { Piece } from '../../../models/feedback/piece';
import { CoreWorkflowService } from '../../shared-core/services/core-workflow.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-feedback-versions,[app-feedback-versions]',
  templateUrl: './feedback-versions.component.html',
  styleUrls: ['./feedback-versions.component.scss']
})
export class FeedbackVersionsComponent implements
  OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  public versionRight = 351;
  public boxWidth = 0;
  public boxWidthPreview = 0;
  public boxHeight = 0;
  public boxHeightPreview = 0;
  public versionsWidth: number;
  public versionsHeight: number;
  public versionsPieceWidth: number;
  public versionsPieceHeight: number;
  public compareBoxWidth: number;
  public compareBoxHeight: number;
  public isShowBrief = false;
  public isShowMeetingNote = false;
  // Subscription
  public subListBrief: ISubscription;
  public subListMeetingNote: ISubscription;
  // Private
  public _leftSidenavCompressed: boolean;
  // Inputs
  @Input() view: string;
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  @Input() comparedVersions: Array<ComparedVersion> = new Array<ComparedVersion>();
  @Input() pieceShow: Piece;
  @Input() set leftSidenavCompressed(leftSidenavCompressed: boolean) {
    this._leftSidenavCompressed = leftSidenavCompressed;
    this.resize();
  }
  @Input() isFeedbackVideo: boolean;
  @Input() pieces: Array<Piece>;
  @Input() commentThreadStatuses: Array<CommentThreadStatus>;
  @Input() participantTypes: Array<ParticipantType>;

  public visibleComments = true;

  constructor(
    @Inject(FeedbackVersionsSidenavComponent) private versionSidenav: FeedbackVersionsSidenavComponent,
    private _feedbackVersionComunicationService: FeedbackVersionComunicationService,
    private _coreWorkflowService: CoreWorkflowService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.resize();
    });

  }
  ngAfterContentInit() {
    this.subListBrief = this._coreWorkflowService.sidenavListBrief.subscribe(show => {
      this.isShowBrief = show;
    });
    this.subListMeetingNote = this._coreWorkflowService.sidenavListMeetingNote.subscribe(show => {
      this.isShowMeetingNote = show;
    });
  }

  resize() {
    this.versionRight = 350;
    const middleWw = window.innerWidth * 0.5;
    if (this.versionRight > middleWw) {
      this.versionRight = middleWw;
    }
    const containerWidth = window.innerWidth - this.versionRight - 90;
    let versionsWidth = containerWidth / 2;
    let versionHeight = versionsWidth;
    if (window.innerWidth < 992) {
      versionsWidth = containerWidth;
      versionHeight = versionsWidth;
    } else {
      if (this.comparedVersions.length > 1) {
        versionHeight = window.innerHeight / 2;
      }
    }
    this.versionsWidth = versionsWidth;
    this.versionsHeight = versionHeight;
    this.versionsPieceHeight = versionHeight - 46;
    this.versionsPieceWidth = versionsWidth - 8;
    this.calculateBoxDropableSize();
    this.calculateCompareBoxSizes();
  }
  private calculateBoxDropableSize() {
    // Calculate Height
    const compareHeaderHeight = 90;
    const compareToolbarHeight = 38;
    const floatingNoteOutset = 109;
    // offsetBottom + padding
    const offsetBottom = 70;
    const offsetContainer = 32;
    const wh = window.innerHeight;
    // calculate
    const containerBoxHeight = wh - compareHeaderHeight - compareToolbarHeight - offsetBottom - floatingNoteOutset - offsetContainer;
    const boxHeight = (containerBoxHeight * 0.5) - 10;
    this.boxHeight = boxHeight;
    this.boxHeightPreview = boxHeight - 20;

    // Calculate Width
    let padding = 64 + 240;
    if (this._leftSidenavCompressed) {
      padding = 64 * 2;
    }
    if (window.innerWidth < 992) {
      padding = 20 * 2;
    }
    const containerWidth = window.innerWidth - padding - this.versionRight;
    let boxWidth = (containerWidth * 0.5) - 6;
    if (window.innerWidth < 992) {
      boxWidth = containerWidth;
    }
    this.boxWidth = boxWidth;
    this.boxWidthPreview = boxWidth;
  }
  private calculateCompareBoxSizes() {
    const total = this.comparedVersions.filter(c => c.empty === false).length;
    // References
    const offsetHeight = 258;
    const offsetWidth = 64 * 2;
    // sizes
    let compareWidth = 0;
    let compareHeight = 0;
    if (window.innerWidth < 992) {
      compareWidth = (window.innerWidth - offsetWidth);
      compareHeight = (window.innerHeight - offsetHeight) / 2;
    } else {
      if (total === 2) {
        compareWidth = (((window.innerWidth - offsetWidth) - 10) / 2);
        compareHeight = window.innerHeight - offsetHeight - 10;
        console.log(compareHeight);

      } else if (total > 2) {
        let padding = 240 * 2;
        if (window.innerWidth < 992) {
          padding = offsetWidth;
        }
        // W
        compareWidth = (((window.innerWidth - padding) - 10) / 2);
        const containerVisual = ((window.innerHeight - offsetHeight) - 41) / 2;
        // H
        compareHeight = containerVisual;
      }
    }
    this.compareBoxHeight = compareHeight;
    this.compareBoxWidth = compareWidth;
  }
  @HostListener('window:resize', ['$event']) onClick(event) {
    setTimeout(() => {
      this.resize();
    });
  }

  closeVersions() {
    if (this.view === 'compare') {
      this.view = 'chooser';
    } else {
      this._feedbackVersionComunicationService.loadCompareVersions();
      this.view = 'chooser';
    }
  }
  showListBrief() {
    this._coreWorkflowService.showSidenavListBrief(true);
  }
  showListMeetingNote() {
    this._coreWorkflowService.showSidenavListMeetingNote(true);
  }

  onCompare() {
    this.calculateCompareBoxSizes();
    this.view = 'compare';
  }
  goTo(view: string) {
    this.view = view;
  }
  ngOnDestroy() {
    if(this.subListBrief){
      this.subListBrief.unsubscribe();
    }
    if(this.subListMeetingNote){
      this.subListMeetingNote.unsubscribe();
    }
  }

}
