import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoutingStateService } from '../../../services/routing-state.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-workflow-header-menu',
  templateUrl: './workflow-header-menu.component.html',
  styleUrls: ['./workflow-header-menu.component.scss']
})
export class WorkflowHeaderMenuComponent implements OnInit {
  // Inputs
  @Input() isApprover = false;
  @Input() canShare = false;
  // Outputs
  @Output() workflowOnShare = new EventEmitter();
  @Output() workflowOnApprove = new EventEmitter();
  @Input() shareAndApprove = false;
  @Input() showWorkflow = true;
  constructor(
    private _router: Router,
    private _routingState: RoutingStateService
  ) { }

  ngOnInit() {
  }

  share() {
    this.workflowOnShare.emit();
  }
  approve() {
    this.workflowOnApprove.emit();
  }
  goBack() {
    if (environment.envName === 'design') {
      this._router.navigate(['/index']);
    } else {
      this._router.navigate(['/dashboard']);
    }
  }
}
