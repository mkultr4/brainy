import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Feedback } from 'src/app/models/feedback/feedback';
import { Core } from 'src/app/models/cores/core';
import { AsidenavComponent } from '../../shared-sidenav/asidenav/asidenav.component';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { CoreWorkflowService } from '../services/core-workflow.service';
import { ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-feedback-list-associated',
  templateUrl: './feedback-list-associated.component.html',
  styleUrls: ['./feedback-list-associated.component.scss']
})
export class FeedbackListAssociatedComponent implements OnInit {

  // Public
  public feedbacks: Array<Feedback>;
  public subscriptionShow: ISubscription;
  public imageNotFound = 'assets/img/image-not-found.jpg';
  // Services
  private _coreService;
  @Input() core: Core;
  @ViewChild('feedbackListSidenav') feedbackListSidenav: AsidenavComponent;
  // Constructor
  constructor(
    private _coreStrategyService: CoreStrategyService,
    private _coreWorkflowService: CoreWorkflowService
  ) {
    this._coreService = this._coreStrategyService.getService();
  }

  ngOnInit() {

  }
  ngAfterContentInit() {
    this.subscriptionShow = this._coreWorkflowService.sidenavListFeedback.subscribe(show => {
      console.log(show);
      if (show) {
        this._coreService.findFeedbackAssociated(this.core).subscribe(feedbacks => {
          console.log(feedbacks);
          this.feedbacks = feedbacks;
        })
        this.showSidenav();
      } else if (this.feedbackListSidenav.getIsShow()) {
        this.hideSidenav();
      }
    });
  }
  showSidenav() {
    this.feedbackListSidenav.showSidenav();
  }
  hideSidenav() {
    this.feedbackListSidenav.hideSidenav();
  }
  viewFeedback(core: Core) {
     this._coreWorkflowService.showSidenavFeedback(core);
  }
  onShow() {
  }
  onHide() {
    this._coreWorkflowService.showSidenavListFeedback(false);
  }

  ngOnDestroy() {
    if (this.subscriptionShow) {
      this.subscriptionShow.unsubscribe();
    }
  }

}
