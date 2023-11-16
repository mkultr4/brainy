import { NgModule } from '@angular/core';
import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsContentComponent } from './brands-content/brands-content.component';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { FilterByBrandPipe } from './pipes/filter-by-brand.pipe';
import { BrandsFilterComponent } from './brands-filter/brands-filter.component';
import { DropdownFilterBrandsComponent } from './brands-filter/dropdown-filter-brands/dropdown-filter-brands.component';
import { BrandBoxComponent } from './brand-box/brand-box.component';
import { SharedFiltersModule } from '../shared-filters/shared-filters.module';
import { ModalDeleteBrandComponent } from './modal-delete-brand/modal-delete-brand.component';
import { ModalEditBrandComponent } from './modal-edit-brand/modal-edit-brand.component';
import { MzInputModule } from 'ngx-materialize';

@NgModule({
  imports: [
    SharedModule,
    SharedHeaderModule,
    SharedFiltersModule,
    SharedComponentsModule,
    MzInputModule,
    SharedModalModule,
    BrandsRoutingModule
  ],
  declarations: [
    BrandsContentComponent,
    BrandsFilterComponent,
    DropdownFilterBrandsComponent,
    BrandBoxComponent,
    ModalDeleteBrandComponent,
    ModalEditBrandComponent,
    // Pipes
    FilterByBrandPipe
  ]
})
export class BrandsModule { }
