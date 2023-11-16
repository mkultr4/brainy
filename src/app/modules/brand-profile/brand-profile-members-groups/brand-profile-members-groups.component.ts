import { Component, OnInit, AfterContentInit, OnDestroy, ViewChild } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { ISubscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { PreloaderService } from '../../shared-components/preloader/preloader.service';
import { TeamFilterService } from '../../shared-team/services/team-filter.service';
import { CategoryStrategyService } from '../../../services/categories/category-strategy.service';
import { Category } from '../../../models/categories/category';
import { ModalCategoryEliminateComponent } from '../../shared-team/modal-category-eliminate/modal-category-eliminate.component';
import { ModalCategoryEditComponent } from '../../shared-team/modal-category-edit/modal-category-edit.component';

@Component({
  selector: 'app-brand-profile-members-groups',
  templateUrl: './brand-profile-members-groups.component.html',
  styleUrls: ['./brand-profile-members-groups.component.scss']
})
export class BrandProfileMembersGroupsComponent
  implements OnInit, AfterContentInit, OnDestroy {
  public workspaceAccess: WorkspaceAccess;
  public brandId: string;
  public categories = [];
  public order: any = { column: 'modified', direction: -1 };
  public query = '';
  // Services
  private _categoryService;
  // Subscription
  public subscriptionFilterQuery: ISubscription;
  public subscriptionCategories: ISubscription;
  public subscriptionParams: ISubscription;
  // View child
  @ViewChild('modalDelete') modalDelete: ModalCategoryEliminateComponent;
  @ViewChild('modalEdit') modalEdit: ModalCategoryEditComponent;
  constructor(
    private _ativatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _preloaderService: PreloaderService,
    private _teamFilterService: TeamFilterService,
    private _categoryStrategyService: CategoryStrategyService
  ) {
    this._categoryService = this._categoryStrategyService.getService();
    // Workspace Access
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    this.subscriptionParams = this._ativatedRoute.parent.parent.params.subscribe(params => {
      this.brandId = params.id;
    });
    // Query
    this.subscriptionFilterQuery = this._teamFilterService.teamQueryFilter.subscribe(query => {
      this.query = query;
    });
  }

  ngOnInit() {
    // Invitations

  }
  // Category
  onDelete(category: Category) {
    this.modalDelete.openModal(category);
  }
  onEdit(category: Category) {
    this.modalEdit.showModal(category);
  }
  ngAfterContentInit() {
    setTimeout(() => {
      this.subscriptionCategories = this._categoryService.categories.subscribe(categories => {
        this.categories = Object.assign([], categories);
      });
      this._categoryService.loadAllBrand(this.workspaceAccess.workspace.id, this.brandId).subscribe(() => {
        this._preloaderService.showPreloader(false);
      });
    });
  }
  ngOnDestroy() {
    if (this.subscriptionFilterQuery) {
      this.subscriptionFilterQuery.unsubscribe();
    }
    if (this.subscriptionCategories) {
      this.subscriptionCategories.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }
}
