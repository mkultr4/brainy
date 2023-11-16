import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { DashboardFilterComponent } from './dashboard-filter/dashboard-filter.component';
import { DashboardBoxComponent } from './dashboard-box/dashboard-box.component';
import { DashboardBoxPreviewComponent } from './dashboard-box-preview/dashboard-box-preview.component';
import { DashboardFilterBrandsComponent } from './dashboard-filter/dashboard-filter-brands/dashboard-filter-brands.component';
import { DashboardFilterProjectsComponent } from './dashboard-filter/dashboard-filter-projects/dashboard-filter-projects.component';
import { DashboardFilterStatusesComponent } from './dashboard-filter/dashboard-filter-statuses/dashboard-filter-statuses.component';
import { DashboardFilterTypesComponent } from './dashboard-filter/dashboard-filter-types/dashboard-filter-types.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterProjectByBrandPipe } from './pipes/filter-project-by-brand.pipe';
import { SharedFiltersModule } from '../shared-filters/shared-filters.module';
import { FilterCoreByStatusPipe } from './pipes/filter-core-by-status.pipe';
import { DashboardTutorialComponent } from './dashboard-tutorial/dashboard-tutorial.component';
import { TourModule } from '../tour/tour.module';
import { DashboardDailyMessageComponent } from './dashboard-daily-message/dashboard-daily-message.component';
import { DashboardBoxMenuComponent } from './dashboard-box-menu/dashboard-box-menu.component';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { ModalDashboardArchiveProjectComponent } from './modal-dashboard-archive-project/modal-dashboard-archive-project.component';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { ModalNewProjectComponent } from './modal-new-project/modal-new-project.component';
import { FloatingNoteModule } from '../floating-note/floating-note.module';

@NgModule({
  imports: [
    SharedModule,
    SharedHeaderModule,
    SharedFiltersModule,
    SharedComponentsModule,
    TourModule,
    SharedModalModule,
    SharedCoreModule,
    FloatingNoteModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardContentComponent,
    DashboardHeaderComponent,
    DashboardFilterComponent,
    DashboardFilterBrandsComponent,
    DashboardFilterProjectsComponent,
    DashboardFilterProjectsComponent,
    DashboardFilterStatusesComponent,
    DashboardFilterTypesComponent,
    DashboardBoxComponent,
    DashboardBoxPreviewComponent,
    DashboardBoxMenuComponent,
    ModalDashboardArchiveProjectComponent,
    DashboardTutorialComponent,
    DashboardDailyMessageComponent,
    ModalNewProjectComponent,
    // Pipes
    FilterBrandPipe,
    FilterProjectByBrandPipe,
    FilterCoreByStatusPipe
  ],
  providers: [
  ]
})
export class DashboardModule { }
