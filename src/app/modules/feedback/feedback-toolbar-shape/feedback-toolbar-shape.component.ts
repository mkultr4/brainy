import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { FeedbackFocusShape, FeedbackToolbarService, FeedbackToolbarAction } from '../services/feedback-toolbar.service';
import { Piece } from '../../../models/feedback/piece';
import { GeneralService } from '../../../services/general/general.service';



@Component({
  selector: 'app-feedback-toolbar-shape,[app-feedback-toolbar-shape]',
  templateUrl: './feedback-toolbar-shape.component.html',
  styleUrls: ['./feedback-toolbar-shape.component.scss']
})
export class FeedbackToolbarShapeComponent implements OnInit, AfterViewInit, OnDestroy {

  public marginTop = 0;
  public menuHeight = 114;
  public top = 0;
  public left = 'auto';
  public right = 'auto';
  public dropdownEdge = 'right';
  public colors: Array<string>;
  public focusShape: FeedbackFocusShape;
  // shapeThreadEl
  public shapeThreadEl;
  // Muation observer
  public mutationShape: MutationObserver;
  // Subscription
  public subscriptionFocusShape: ISubscription;
  @Input() piece: Piece;
  @Input() calculatedHeight = 0;
  @Input() calculatedWidth = 0;
  @Input() containerWidth = 0;
  @Input() containerHeight = 0;
  constructor(
    private _feedbackToolbarService: FeedbackToolbarService,
    private _generalService: GeneralService
  ) { }

  ngOnInit() {
    this.colors = this._generalService.getColors();
  }

  ngAfterViewInit() {
    this.mutationShape = new MutationObserver(mutations => {
      mutations.forEach((mutation) => {
        if (this.focusShape && this.focusShape.commentThread) {
          console.log(mutation);
          const element = $(mutation.target);
          console.log(element);
          if (!element.attr('hidden')) {
            this.calculatePosition();
          } else {
            this.mutationShape.disconnect();
          }
        }
      });
    });
    this.subscriptionFocusShape = this._feedbackToolbarService.focusShape$.
      subscribe(focusShape => {
        setTimeout(() => {
          this.focusShape = focusShape;
          if (focusShape.focus) {
            // ((calculatedHeight * (_zoom /100)) / 2 ) - (114/2)
            this.shapeThreadEl = $('#shape-' + this.focusShape.commentThread.id);
            this.calculatePosition();
            const config = { attributes: true, childList: true, characterData: true };
            this.mutationShape.observe(this.shapeThreadEl.get(0), config);
          } else {
            if (this.mutationShape) {
              this.mutationShape.disconnect();
            }
          }
        });
      });
  }

  private calculatePosition() {
    // Detect popup position
    let popupWidth = 370;
    const windowInnerWidth50 = window.innerWidth * 0.5;
    const containerWidth30 = (this.containerWidth - 80) * 0.3;
    if (windowInnerWidth50 < popupWidth) {
      popupWidth = windowInnerWidth50;
    }
    const rect = this.shapeThreadEl.get(0).getBoundingClientRect();
    let display = 'right';
    const container = this.shapeThreadEl.closest('.piece-workflow-wrapper');
    const windowLeft = rect.left;
    const windowRight = window.innerWidth - rect.left;
    // Container shape
    let windowLeftContainer = this.shapeThreadEl.position().left + 20;
    let windowRightContainer = container.width() - this.shapeThreadEl.position().left - this.shapeThreadEl.width();
    if (!this.focusShape.commentThread.saved) {
      if (windowLeft > windowRight) {
        windowLeftContainer = windowLeftContainer - popupWidth;
      } else {
        windowRightContainer = windowRightContainer - popupWidth;
      }
    }
    if (windowLeftContainer > windowRightContainer) {
      display = 'left';
    }
    // Calculate x position
    let xPosition = 0;
    if (this.calculatedWidth > this.containerWidth) {
      xPosition = 40;
    } else {
      if (this.calculatedWidth > containerWidth30) {
        xPosition = ((this.containerWidth - this.calculatedWidth) / 2) + 20;
      } else {
        xPosition = ((this.containerWidth - this.calculatedWidth) / 2) - 20;
      }
    }

    /* if (display === 'left' && this.piece.type === 'video') {
      xPosition = 20;
    }*/

    if (display === 'left') {
      this.right = 'auto';
      this.left = xPosition + 'px';
      this.dropdownEdge = 'right';
    } else {
      this.left = 'auto';
      this.right = xPosition + 'px';
      this.dropdownEdge = 'left';
    }


    if (this.calculatedHeight > this.containerHeight) {
      this.marginTop = (this.containerHeight / 2) - (this.menuHeight / 2);
    } else {
      this.marginTop = (this.calculatedHeight / 2) - (this.menuHeight / 2);
    }


  }
  /**
   * Mouse down
   * @param $event
   */
  mousedownToolbarShape($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
  /**
   * Execute action
   */
  execute($event, action, value) {
    $event.preventDefault();
    $event.stopPropagation();
    const feedbackToolbarAction: FeedbackToolbarAction = new FeedbackToolbarAction();
    feedbackToolbarAction.type = action;
    feedbackToolbarAction.args = value;
    this._feedbackToolbarService.triggerToolbarAction(feedbackToolbarAction);
  }

  ngOnDestroy() {
    if (this.subscriptionFocusShape) {
      this.subscriptionFocusShape.unsubscribe();
    }
    if (this.mutationShape) {
      this.mutationShape.disconnect();
    }
  }

}
