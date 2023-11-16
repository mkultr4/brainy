import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AsidenavComponent } from '../../shared-sidenav/asidenav/asidenav.component';

import { BriefTemplate } from '../../../models/brief/brief-template';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-brief-template-sidenav',
  templateUrl: './brief-template-sidenav.component.html',
  styleUrls: ['./brief-template-sidenav.component.scss']
})
export class BriefTemplateSidenavComponent implements OnInit, AfterViewInit, OnDestroy {
  // Public vars
  public template: BriefTemplate;
  public categories: Array<any>;
  // Private
  private _briefService;
  // View child
  @ViewChild('briefTemplateSidenav') briefTemplateSideNav: AsidenavComponent;
  @ViewChild('scroll', { read: PerfectScrollbarDirective }) scroll: PerfectScrollbarDirective;
  // Constructor
  constructor(
    private _briefStrategyService: BriefStrategyService
  ) {
    this._briefService = this._briefStrategyService.getService();
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
  }

  showSidenav(briefTemplate: BriefTemplate) {

    this._briefService.getTemplate(briefTemplate.id).subscribe(template => {
      this.template = template;
      this.briefTemplateSideNav.showSidenav();
    })
  }
  onShow() {
    
  }

  onHide() {
    this.template = undefined;
    setTimeout(()=>{
      this.scroll.scrollToTop();
    });
  }

  
  ngOnDestroy() {

  }

  

}
