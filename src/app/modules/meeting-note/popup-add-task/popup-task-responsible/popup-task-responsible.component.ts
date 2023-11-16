import { Component, OnInit, AfterContentInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkspaceAccessStrategyService } from 'src/app/services/workspace/workspace-access-strategy.service';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Task } from 'src/app/models/meeting-note/task';

@Component({
  selector: 'app-popup-task-responsible',
  templateUrl: './popup-task-responsible.component.html',
  styleUrls: ['./popup-task-responsible.component.scss']
})
export class PopupTaskResponsibleComponent implements OnInit, AfterContentInit {
  // Public
  public asyncParticipantSearch = '';
  public typeaheadLoading: boolean;
  public typeaheadNoResults: boolean;
  public dataSourceParticipants: Observable<any>;
  // Services
  private _workspaceAccessService;
  // Inputs
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() task: Task;
  constructor(
    private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
  ) {
    this._workspaceAccessService = this._workspaceAccessStrategyService.getService();

  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.dataSourceParticipants = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncParticipantSearch);
    }).mergeMap((token: string) => this._workspaceAccessService.findWorkspaceAccess(this.workspaceAccess.workspace.id, token));
  }

  // When search
  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
  // When dont have results
  changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }
  // Typehead select
  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.asyncParticipantSearch = '';
    const workspaceAccess = <WorkspaceAccess>e.item;
    this.task.responsible = workspaceAccess;
  }
  removeResponsible() {
    this.task.responsible = undefined;
  }
}
