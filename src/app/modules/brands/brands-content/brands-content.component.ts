import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { PreloaderService } from '../../shared-components/preloader/preloader.service';
import { Brand } from '../../../models/brands/brand';
import { Subscription, Observable } from 'rxjs';
import { ModalDeleteBrandComponent } from '../modal-delete-brand/modal-delete-brand.component';
import { ModalEditBrandComponent } from '../modal-edit-brand/modal-edit-brand.component';
import { DropdownOrderEvent } from '../../shared-filters/dropdown-order/dropdown-order.component';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BrandStrategyService } from '../../../services/brands/brand-strategy.service';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';

@Component({
  selector: 'app-brands-content',
  templateUrl: './brands-content.component.html',
  styleUrls: ['./brands-content.component.scss'],
  providers: [InvitationStrategyService]
})
export class BrandsContentComponent implements OnInit, AfterContentInit,
  AfterViewInit, OnDestroy {
  public brands: Brand[];
  public currentUser: User;
  public workspaceAccess: WorkspaceAccess;
  public empty = false;
  // Filters
  public mainSearch: string;
  // Order
  public filterOrderColumn = 'modified';
  public filterOrderDirection = -1;
  public orderBy = '-modified';
  public filterBrand = <Brand>{ id: 'all' };
  public filterStatuses;
  // Services
  private _brandService;
  // Subscriptions
  public subscriptionBrand: Subscription;
  public subscriptionQueryParams: Subscription;
  // View childs
  @ViewChild('modalDelete') modalDelete: ModalDeleteBrandComponent;
  @ViewChild('modalEdit') modalEdit: ModalEditBrandComponent;
  constructor(
    private _authService: AuthenticationService,
    private _preloaderService: PreloaderService,
    private _activatedRoute: ActivatedRoute,
    private _brandStrategyService: BrandStrategyService
  ) {
    this._brandService = this._brandStrategyService.getService();
    this.currentUser = this._authService.getAuthUser();
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    if (environment.envName === 'design') {
      this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(queryParams => {
        // Tour
        this.empty = queryParams['empty'] ? true : false;
      });
    }
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this._brandService.loadAll(this.workspaceAccess.workspace.id,this.empty).subscribe(brands => {
      this._preloaderService.showPreloader(false);
    });

    this.subscriptionBrand = this._brandService.brands.subscribe(brands => {
      this.brands = Object.assign([], brands);
    });
  }
  ngAfterViewInit() {

  }

  onDelete(brand: Brand) {
    this.modalDelete.openModal(brand);
  }
  onEdit(brand: Brand) {
    this.modalEdit.showModal(brand);
  }
  onChangeMainSearch(search) {
    this.mainSearch = search;
  }
  onChangeFilterOrder(order: DropdownOrderEvent) {
    this.filterOrderColumn = order.column;
    this.filterOrderDirection = order.direction;
    this.orderBy = order.getOrderBy();
  }

  onChangeFilterBrand(brand: Brand) {
    this.filterBrand = brand;
  }

  ngOnDestroy() {
    if (this.subscriptionQueryParams) {
      this.subscriptionQueryParams.unsubscribe();
    }
    if (this.subscriptionBrand) {
      this.subscriptionBrand.unsubscribe();
    }
  }

}
