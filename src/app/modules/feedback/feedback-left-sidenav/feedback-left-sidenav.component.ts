import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterContentInit, OnDestroy } from '@angular/core';
import { Piece } from '../../../models/feedback/piece';
import { Feedback } from '../../../models/feedback/feedback';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { WorkflowService } from '../../../services/workflow/workflow.service';
import * as uuid from 'uuid/v4';
import { FeedbackStrategyService } from '../../../services/feedback/feedback-strategy.service';
import { FeedbackWorkflowService } from '../services/feedback-workflow.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback-left-sidenav',
  templateUrl: './feedback-left-sidenav.component.html',
  styleUrls: ['./feedback-left-sidenav.component.scss']
})
export class FeedbackLeftSidenavComponent implements OnInit, AfterContentInit, OnDestroy {
  // Publics
  public enabled = true;
  public sorting = false;
  public piecesSortableOptions: SortablejsOptions = {
    forceFallback: true,
    fallbackClass: 'sortable-fallback',
    disabled: !this.enabled,
    filter: '.static',
    handle: '.feeback-piece-carousel-drag-handler',
    onStart: () => {
      this.sorting = true;
      $(this.scroll.elementRef.nativeElement).addClass('sorting');
    },
    onEnd: () => {
      this.sorting = false;
      $(this.scroll.elementRef.nativeElement).removeClass('sorting');
    },
    onUpdate: (event) => {
      let order = 1;
      this.pieces.forEach((piece, index) => {
        this.pieces[index].order = order;
        order++;
      });

      this._feedbackService.updateOrderFeedbackPieces(this.pieces).subscribe(suc => {
          console.log('ordenadas correctamente');
        }, error => {
          this._toastrService.error('No se pudieron actualizar intente nuevamente');
      });

    }
  };
  // Private
  private _feedbackService;
  // Inputs
  @Input() pieces: Array<Piece> = [];
  @Input() isFeedbackVideo = false;
  @Input() editable: boolean;
  @Input() pieceShow: Piece;
  @Input() feedback: Feedback;
  @Input() compressed = false;
  // View childs
  @ViewChild(PerfectScrollbarDirective) scroll: PerfectScrollbarDirective;
  constructor(
    private _workflowService: WorkflowService,
    private _feedbackStrategyService: FeedbackStrategyService,
    private _feedbackWorkflowService: FeedbackWorkflowService,
    private _toastrService: ToastrService
  ) {
    this._feedbackService = this._feedbackStrategyService.getService();

    this._feedbackService.pieceSelected().subscribe((response) => {
      setTimeout(() => {
        this._feedbackWorkflowService.showPiece(response);
      }, 2500);
      
    });
  }

  ngOnInit() {

  }

  ngAfterContentInit() {
  }
  /**
   * Scroll down
   */
  scrollDown() {
    const element = this.scroll.elementRef.nativeElement;
    const maxScrollTop = element.scrollHeight - $(element).outerHeight();

    const nextScroll = element.scrollTop + 130;
    if (nextScroll < maxScrollTop) {
      this.scroll.scrollTo(nextScroll);
    } else {
      this.scroll.scrollTo(maxScrollTop);
    }

  }
  /**
   * Compress
   */
  compress() {
    this._workflowService.compressLeftSidenav(!this.compressed);
  }
  /**
   * Add a piece
   */
  addPiece() {
    console.log(this.pieces);
    const emptyList = this.pieces.length === 1 &&
      this.pieces.filter(p => p.empty).length === 1;
    if (!emptyList) {
      console.log('pareciera que funciona');
      const piece = new Piece();
      piece.id = uuid();
      piece.latest = true;
      this._feedbackService.createFeedbackPiece(piece);
      this.selectPiece(piece);
      if (window.innerWidth < 992) {
        this._workflowService.compressLeftSidenav(true);
      }
    }
  }
  /**
   * Select a piece
   * @param pieceShow
   */
  selectPiece(pieceShow: Piece) {
    console.log(pieceShow);
    setTimeout(() => {
      // this.onFeedbackPieceChange.emit(pieceShow);
      this._feedbackWorkflowService.showPiece(pieceShow);
      if (window.innerWidth < 992) {
        this._workflowService.compressLeftSidenav(true);
      }
    });
  }
  /**
   * Delete a piece
   * @param piece
   */
  deletePiece(piece: Piece) {
    this._feedbackService.deleteFeedbackPiece(piece.id).subscribe(pieces => {
      setTimeout(() => {
        this.scroll.update();
        if (this.pieceShow.id === piece.id) {
          this._feedbackWorkflowService.showPiece(pieces[0]);
        }
      });
    });

  }

  ngOnDestroy() {

  }

}
