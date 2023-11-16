import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Category } from '../../../models/categories/category';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { AccountStatus } from '../../../models/workspace/account-status';
import { ISubscription } from 'rxjs/Subscription';
import { ModalCategoryEliminateComponent } from '../../shared-team/modal-category-eliminate/modal-category-eliminate.component';
import { ModalCategoryEditComponent } from '../../shared-team/modal-category-edit/modal-category-edit.component';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { CategoryStrategyService } from '../../../services/categories/category-strategy.service';
import { PreloaderService } from '../../shared-components/preloader/preloader.service';
import { ToastrService } from 'ngx-toastr';
import { TeamFilterService } from '../../shared-team/services/team-filter.service';
import { DropdownOrderEvent } from '../../shared-filters/dropdown-order/dropdown-order.component';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs/Subscription';
import { GroupService } from '../../../services/group/group.service';
import { Group } from '../../../models/group/group';
import { User } from '../../../models/users/user';
@Component({
  selector: 'app-team-groups',
  templateUrl: './team-groups.component.html',
  styleUrls: ['./team-groups.component.scss']
})
export class TeamGroupsComponent implements OnInit, OnDestroy {
  // public vars
  public $box;
  public currentUser: User
  public workspaceAccess: WorkspaceAccess;
  public group: Group;
  //public categories = [];
  public filterStatus: AccountStatus;
  public filterOrderColumn = 'modified';
  public filterOrderDirection = -1;
  public orderBy = '-modified';
  public query = '';
  public tour = false;
  public empty = false;

  public categories: Array<Group>;
  // Subscription
  public subscriptionFilterStatus: ISubscription;
  public subscriptionFilterOrder: ISubscription;
  public subscriptionFilterQuery: ISubscription;
  public subscriptionCategories: ISubscription;
  public subscriptionQueryParams: ISubscription;
  //Privates
  private type;
  private reference;
  //Subscription
  public groupSubscription: Subscription;
  // Services
  private _categoryService;
  
  // View child
  @ViewChild('modalDelete') modalDelete: ModalCategoryEliminateComponent;
  @ViewChild('modalEdit') modalEdit: ModalCategoryEditComponent;
  constructor(
    private _authService: AuthenticationService,
    private _GroupService: GroupService,
    private _activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private _categoryStrategyService: CategoryStrategyService,
    private _teamFilterService: TeamFilterService,
    private _toastrService: ToastrService,
    private _preloaderService: PreloaderService,
    
  ) {

    this.currentUser = this._authService.getAuthUser()

      this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(queryParams => {
        // Tour
        this.empty = queryParams['empty']=== 'true' ? true : false;
      });
    
    this._categoryService = this._categoryStrategyService.getService();
    // Workspace Access
    this.workspaceAccess = this.authService.getAuthWorkspaceAccess();

    // Invitations
    this.subscriptionCategories = this._categoryService.categories.subscribe(categories => {
      console.log(categories);
      this.categories = Object.assign([], categories);
    });
    // Filter status
    this.subscriptionFilterStatus = this._teamFilterService.teamStatusFilter.subscribe(status => {
      this.filterStatus = status;
    });
    // Order
    this.subscriptionFilterOrder = this._teamFilterService.teamOrderFilter.subscribe((order: DropdownOrderEvent) => {
      this.orderBy = order.getOrderBy();
    });
    // Query
    this.subscriptionFilterQuery = this._teamFilterService.teamQueryFilter.subscribe(query => {
      this.query = query;
    });
  }

  ngOnInit() {

      this._categoryService
      .loadAll(this.workspaceAccess.workspace.id, this.empty).subscribe(() => {
        this._preloaderService.showPreloader(false);
      });
  }

  onCreateCategory(category: Category) {
    this._categoryService.create(category).subscribe(c => {
      this._toastrService.info('Se ha creado la nueva categoría exitosamente');
    });
  }

  // Category
  onDelete(category: Category) {
    this.modalDelete.openModal(category);
  }
  onEdit(category: Category) {
    this.modalEdit.showModal(category);
  }
  ngOnDestroy() {
    if (this.subscriptionQueryParams) {
      this.subscriptionQueryParams.unsubscribe();
    }
    if (this.subscriptionCategories) {
      this.subscriptionCategories.unsubscribe();
    }
    if (this.subscriptionFilterStatus) {
      this.subscriptionFilterStatus.unsubscribe();
    }
    if (this.subscriptionFilterOrder) {
      this.subscriptionFilterOrder.unsubscribe();
    }
    if (this.subscriptionFilterQuery) {
      this.subscriptionFilterQuery.unsubscribe();
    }
  }

}
