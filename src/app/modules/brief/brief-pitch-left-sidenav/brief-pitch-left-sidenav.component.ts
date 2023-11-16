import { Component, OnInit, Input } from '@angular/core';
import { BriefLeftSidenavComponent } from '../brief-left-sidenav/brief-left-sidenav.component';
import { ToastrService } from 'ngx-toastr';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';

@Component({
  selector: 'app-brief-pitch-left-sidenav',
  templateUrl: './brief-pitch-left-sidenav.component.html',
  styleUrls: ['./brief-pitch-left-sidenav.component.scss']
})
export class BriefPitchLeftSidenavComponent
  extends BriefLeftSidenavComponent
  implements OnInit {
  // Input
  @Input() proposals = [];
  @Input() hasProposalsNews = false;
  @Input() finalists = [];
  @Input() hasFinalistsNews = false;
  constructor(
    _workflowService: WorkflowService,
    _briefStrategyService: BriefStrategyService,
    _toastrService: ToastrService
  ) {
    super(_workflowService, _briefStrategyService, _toastrService);
  }

  ngOnInit() {

  }

}
