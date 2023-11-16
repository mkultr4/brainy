  import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
  } from '@angular/core';
  import { CoreType } from '../../../models/cores/core-type';
  import { Brand } from '../../../models/brands/brand';
  import { Project } from '../../../models/projects/project';
  import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
  import { Core } from '../../../models/cores/core';
  import { ActivityService } from '../../../services/activity/activity.service';
  import { importType, Type } from '@angular/compiler/src/output/output_ast';
  import { from } from 'rxjs';
  import { MyProfileService } from '../../../services/myProfile/my-profile.service';
  import { Subscription } from 'rxjs/Subscription';
  import { User } from '../../../models/users/user';
  import { Activity } from '../../../models/activity/activity';
  import { Workspace } from 'src/app/models/workspace/workspace';
  import { AuthenticationService } from 'src/app/services/auth/authentication.service';
  import { WorkspaceAccessStrategyService } from 'src/app/services/workspace/workspace-access-strategy.service';
  import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
  import { MyProfileStrategyService } from 'src/app/services/myProfile/my-profile-strategy.service';
  import { ActivityStrategyService } from 'src/app/services/activity/activity-strategy.service';


  @Component({
    selector: 'app-profile-activity-cores-table',
    templateUrl: './profile-activity-cores-table.component.html',
    styleUrls: ['./profile-activity-cores-table.component.scss']
  })
  export class ProfileActivityCoresTableComponent implements OnInit {
    // Public
    public isShowSearch = false;
    public filterTitle = '';
    public filterBrand = < Brand > {
      id: 'all'
    };
    public filterProject = < Project > {
      id: 'all'
    };
    public filterType = < CoreType > {
      id: 'all',
      key: 'all'
    };

    public currentUser: User;
    public activity: Array < Activity > ;
    //public workspaceAccess: WorkspaceAccess;
    //Privates
    private type;
    private reference;
    //Subscription
    public myprofileSubscription: Subscription;
    // Services
    private _workspaceAccessService;
    private _invitationService;

    private _activityService;

    @Input() workspaceAccess: WorkspaceAccess;
    @Input() cores: Array < Core > ;
    @Input() coreTypes;
    @Input() brands;
    @Input() projects;
    @Input() showRemove;
    // Output
    @Output() tableRemoveCore = new EventEmitter;
    constructor(
      private _authService: AuthenticationService,
      private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
      private _invitationStrategyService: InvitationStrategyService,
      private _activityStrategyservice: ActivityStrategyService
    ) {
      // Services
      this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
      this._invitationService = this._invitationStrategyService.getService();
      this._activityService = this._activityStrategyservice.getService();
      // Auth
      this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    }

    ngOnInit() {

    }

    getActivity() {
      this._activityService.getActivity().subscribe(
        result => {
          this.cores = result;
        }
      )
    }

    showSearch(show: boolean) {
      this.isShowSearch = show;
    }
    onChangeSearch(filterName: string) {
      this.filterTitle = filterName;
    }
    onChangeFilterBrand(brand: Brand) {
      this.filterBrand = brand;
    }
    onChangeFilterProject(project: Project) {
      this.filterProject = project;
    }
    onChangeFilterType(filterType) {
      this.filterType = filterType;
    }
    toggleClass($event) {
      const target = $($event.target).closest('.core-row').find('.collapse-link');
      target.trigger('click');
    }

    removeCore(core) {
      this.tableRemoveCore.emit(core);
    }

  }
