import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Core } from '../../../models/cores/core';
import { AsidenavComponent } from '../../shared-sidenav/asidenav/asidenav.component';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { Brief } from '../../../models/brief/brief';
import { CoreWorkflowService } from '../services/core-workflow.service';
@Component({
  selector: 'app-brief-list-associated',
  templateUrl: './brief-list-associated.component.html',
  styleUrls: ['./brief-list-associated.component.scss']
})
export class BriefListAssociatedComponent implements OnInit {

  private showSubs: ISubscription;
  public briefs: Array<Brief>;
  // Services
  private _coreService;
  @Input() core: Core;
  @ViewChild('briefListSidenav') briefListSidenav: AsidenavComponent;
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
    this.showSubs = this._coreWorkflowService.sidenavListBrief.subscribe(show => {
      if (show) {
        this._coreService.findBriefAssociated(this.core).subscribe(briefs => {
          this.briefs = briefs;
        })
        this.showSidenav();
      } else if (this.briefListSidenav.getIsShow()) {
        this.hideSidenav();
      }
    });
  }
  showSidenav() {
    this.briefListSidenav.showSidenav();
  }
  hideSidenav() {
    this.briefListSidenav.hideSidenav();
  }
  viewBrief(core: Core) {
    this._coreWorkflowService.showSidenavBrief(core);
  }
  onShow() {
  }
  onHide() {
    this._coreWorkflowService.showSidenavListBrief(false);
  }

  ngOnDestroy() {
    if (!this.showSubs.closed) {
      this.showSubs.unsubscribe();
    }
  }

}
