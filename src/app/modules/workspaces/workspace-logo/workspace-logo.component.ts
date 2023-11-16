import { Component, OnInit, Input } from '@angular/core';
import { Workspace } from '../../../models/workspace/workspace';

@Component({
  selector: '[app-workspace-logo]',
  templateUrl: './workspace-logo.component.html',
  styleUrls: ['./workspace-logo.component.scss']
})
export class WorkspaceLogoComponent implements OnInit {
  @Input() workspace: Workspace;
  constructor() { }

  ngOnInit() {
  }

}
