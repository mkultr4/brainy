import { Component, AfterContentInit } from '@angular/core';
import { CoreWorkflowService } from '../services/core-workflow.service';
import { ISubscription } from 'rxjs/Subscription';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { FeedbackStrategyService } from 'src/app/services/feedback/feedback-strategy.service';

@Component({
  selector: 'app-feedback-associated',
  templateUrl: './feedback-associated.component.html',
  styleUrls: ['./feedback-associated.component.scss'],
  providers: [
    CoreStrategyService,
    FeedbackStrategyService
  ]
})
export class FeedbackAssociatedComponent implements AfterContentInit {
  // Public vars
  public sidenavShow = false;
  public feedback;
  public pieces;
  public minimize = false;
  // Subscriptions
  public subscriptionShowSidenav: ISubscription;
  // Services
  private _coreService;
  private _feedbackService;
  constructor(
    private _coreWorkflowService: CoreWorkflowService,
    private _coreStrategyService: CoreStrategyService,
    private _feedbackStrategyService: FeedbackStrategyService
  ) {
    this._feedbackService = this._feedbackStrategyService.getService();
    this._coreService = this._coreStrategyService.getService();
  }

  ngAfterContentInit() {
    this.subscriptionShowSidenav = this._coreWorkflowService.sidenavFeedback.subscribe(core => {

      if (core) {
        this._coreService.loadById(core.id,'feedback').subscribe(core => {
          this.feedback = core;
          this.sidenavShow = true;
          this._feedbackService.findPiecesFeedbackClose(this.feedback.id).subscribe(pieces => {
            this.pieces = pieces;
          });
        });

      } else {
        if (this.minimize) {
          this.feedback = null;
            this.sidenavShow = false;
          setTimeout(() => {
            this.minimize = false;
          }, 200);
        } else {
          this.feedback = null;
          this.sidenavShow = false;
        }
      }
    });
  }

  onMinimize(minimize) {
    this.minimize = minimize;
  }

  closeSidenav(){
    this._coreWorkflowService.showSidenavFeedback(null);
  }

}
