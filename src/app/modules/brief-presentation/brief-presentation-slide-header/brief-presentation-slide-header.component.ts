import { Component, OnInit, Input, AfterContentInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { CoreWorkflowService } from '../../shared-core/services/core-workflow.service';
@Component({
  selector: 'app-brief-presentation-slide-header',
  templateUrl: './brief-presentation-slide-header.component.html',
  styleUrls: ['./brief-presentation-slide-header.component.scss'],
  host: {
    'class': 'presentation-header-wrapper'
  }
})
export class BriefPresentationSlideHeaderComponent implements OnInit, AfterContentInit, OnDestroy {
  // Public vars
  public isShowBrief = false;
  // Subscriptions
  public subListBrief: ISubscription;
  // Inputs
  @Input() slideWidth;
  constructor(
    private _coreWorkflowService: CoreWorkflowService
  ) { }
  // Init
  ngOnInit() {
  }
  // After content init
  ngAfterContentInit() {
    this.subListBrief = this._coreWorkflowService.sidenavListBrief.subscribe(show => {
      this.isShowBrief = show;
    });
  }

  // Show sidenav of brief
  showListBrief() {
    this._coreWorkflowService.showSidenavListBrief(true);
  }
  // On destroy
  ngOnDestroy() {
    if (this.subListBrief) {
      this.subListBrief.unsubscribe();
    }
  }

}
