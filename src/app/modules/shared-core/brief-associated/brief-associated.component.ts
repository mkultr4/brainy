import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { AsidenavComponent } from '../../shared-sidenav/asidenav/asidenav.component';
import { CoreWorkflowService } from '../services/core-workflow.service';
import { Brief } from '../../../models/brief/brief';
import { BriefTemplate } from '../../../models/brief/brief-template';
import { CORE_STATUSES } from '../../../data/mock-cores';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { InvitationLevel } from 'src/app/models/invitations/invitation-level';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
@Component({
  selector: 'app-brief-associated',
  templateUrl: './brief-associated.component.html',
  styleUrls: ['./brief-associated.component.scss'],
  providers: [BriefStrategyService]
})
export class BriefAssociatedComponent implements OnInit, AfterContentInit {
  public brief: Brief;
  public categories: BriefCategory[];
  public invitations = [];
  private subscriptionShowSidenav: ISubscription;
  private _briefService;
  private _invitationService;
  @ViewChild('briefSidenav') briefSidenav: AsidenavComponent;

  constructor(
    private _coreWorkflowService: CoreWorkflowService,
    private _briefStrategyService: BriefStrategyService,
    private _invitationStrategyService: InvitationStrategyService
  ) {
    this._briefService = this._briefStrategyService.getService();
    this._invitationService = this._invitationStrategyService.getService();
  }

  ngOnInit() {

  }
  ngAfterContentInit() {
    this.subscriptionShowSidenav = this._coreWorkflowService.sidenavBrief.subscribe(core => {
      if (core) {



        this._briefService.getBriefCloseById(core.id).subscribe(brief => {
          console.log(brief);
          this.brief = brief;
          // Topics
          this._briefService.findCategoriesClose(this.brief.id).subscribe(categories => {
            console.log(categories);
            this.categories = categories;
          });
          this._invitationService.loadAllCloseCore(InvitationLevel.CORE, core.id, false)
            .subscribe(invitations => {
              this.invitations = invitations;
            });
          this.showSidenav();
        });
      } else if (this.briefSidenav.getIsShow()) {
        this.hideSidenav();
      }
    });
  }
  showSidenav() {
    this.briefSidenav.showSidenav();
  }
  hideSidenav() {
    this.briefSidenav.hideSidenav();
  }
  onShow() {
  }
  onHide() {
    this.brief = null;
    this._coreWorkflowService.showSidenavBrief(null);
  }

  ngOnDestroy() {
    if (!this.subscriptionShowSidenav.closed) {
      this.subscriptionShowSidenav.unsubscribe();
    }
  }

}
