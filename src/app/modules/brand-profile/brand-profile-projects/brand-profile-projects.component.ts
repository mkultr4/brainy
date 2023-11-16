import { Component, OnInit, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Project } from '../../../models/projects/project';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectStrategyService } from '../../../services/projects/project-strategy.service';
import { BrandProfileService } from '../services/brand-profile.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { PreloaderService } from '../../shared-components/preloader/preloader.service';
import { Invitation } from '../../../models/invitations/invitation';
import { Core } from '../../../models/cores/core';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { ModalEditCoreComponent } from '../modal-edit-core/modal-edit-core.component';
import { ModalDeleteCoreComponent } from '../../shared-core/modal-delete-core/modal-delete-core.component';
import { CoreType } from '../../../models/cores/core-type';
import { ModalShareParticipantsComponent } from '../../shared-participants/modal-share-participants/modal-share-participants.component';

@Component({
  selector: 'app-brand-profile-projects',
  templateUrl: './brand-profile-projects.component.html',
  styleUrls: ['./brand-profile-projects.component.scss']
})
export class BrandProfileProjectsComponent implements OnInit, AfterContentInit, OnDestroy {
  // Public id
  public id;
  public cores: Array<Core>;
  public projects: Array<Project> = [];
  public coreTypes: Array<CoreType> = [];
  public workspaceAccess: WorkspaceAccess;
  public isShowSearch = false;
  public filterName = '';
  public invitationReferenceId = undefined;
  public objectType = undefined;
  // Filters
  public filterProject = <Project>{ id: 'all' };
  public filterType = <CoreType>{ id: 'all', key: 'all' };
  // Services
  private _coreService;
  private _projectService;
  // Subscriptions
  public subscriptionParams: ISubscription;
  public subscriptionCores: ISubscription;
  // View child
  @ViewChild('modalEditProject') modalEditProject: ModalEditCoreComponent;
  @ViewChild('modalDeleteProject') modalDeleteProject: ModalDeleteCoreComponent;
  @ViewChild('modalShare') modalShare: ModalShareParticipantsComponent;

  constructor(
    private _router: Router,
    private _ativatedRoute: ActivatedRoute,
    private _coreStrategyService: CoreStrategyService,
    private _brandProfileService: BrandProfileService,
    private _projectStrategyService: ProjectStrategyService,
    private _authService: AuthenticationService,
    private _preloaderService: PreloaderService
  ) {
    this._coreService = this._coreStrategyService.getService();
    this._projectService = this._projectStrategyService.getService();
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();


  }

  ngOnInit() {
    this.subscriptionParams = this._ativatedRoute.parent.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngAfterContentInit() {
    // Subscribe
    this.subscriptionCores = this._coreService.cores.subscribe(cores => {
      this.cores = Object.assign([], cores);
      console.log(cores);
      this.processProjects();
      this._brandProfileService.updateCores(this.cores);
    });



    this._coreService.getAllTypes().subscribe(types => {
      this.coreTypes = types.filter(t => t.key !== 'brief-template' && t.key !== 'note');
    });
    // Load
    this._coreService.loadByBrand(this.id).subscribe(cores => {
      // console.log(cores);
      this._preloaderService.showPreloader(false);
    });
  }
  processProjects(){
    this.cores.forEach( c =>{
        const index = this.projects.findIndex(p => p.id === c.project.id);
        if(index === -1){
          this.projects.push(c.project);
        }
    });
  }

  showSearch(show: boolean) {
    this.isShowSearch = show;
  }
  onChangeSearch(filterName: string) {
    this.filterName = filterName;
  }

  onChangeFilterProject(project: Project) {
    this.filterProject = project;
  }
  changeFilterType(filterType) {
    this.filterType = filterType;
  }
  /**
   * Edit project
   * @param project
   */
  editProject(core: Core) {
    this.modalEditProject.openModal(core);
  }
  /**
   * Delete project
   * @param project
   */
  deleteProject(core: Core) {
    this.modalDeleteProject.openModal(core);
  }
  /**
   * Modal on delete
   */
  modalOnDelete() {

  }
  /**
   * Share project
   * @param project
   */
  shareProject(core: Core) {
    this.invitationReferenceId = core.id;
    this.objectType = core.type.key;
    this.modalShare.showModal();
  }

  onCloseModalShare(invitations: Invitation[]) {
    if (invitations && invitations.length > 0) {

    }
  }
  /**
   * On delete invitation
   * @param event 
   */
  onDeleteInvitation(event){
    console.log(event);
    const index = this.cores.findIndex(c => c.id === event.core.id);
    const core = this.cores[index];
    core.invitations.splice(event.indexInvitation,1);
    this.cores[index].invitations = Object.assign([],core.invitations);
    console.log(this.cores[index]);
  }

  goToProject($event, project: Project) {
    const target = $(event.target);
    if (
      target.closest('.btn-burguer-default').length === 0 &&
      target.closest('.toolbar-project-table').length === 0
    ) {
      this._router.navigate(['/projects', project.id]);
    }
  }

  toggleClass($event) {
    const target = $($event.target).closest('.project-link').find('.collapse-link');
    target.trigger('click');
  }
  ngOnDestroy() {
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
    if (this.subscriptionCores) {
      this.subscriptionCores.unsubscribe();
    }
  }
}
