import { NgModule } from '@angular/core';
import { BriefTemplateRoutingModule } from './brief-template-routing.module';
import { BriefTemplateHeaderComponent } from './brief-template-header/brief-template-header.component';
import { BriefTemplateItemComponent } from './brief-template-item/brief-template-item.component';
import { BriefTemplateSidenavComponent } from './brief-template-sidenav/brief-template-sidenav.component';
import { BriefTemplateContentComponent } from './brief-template-content/brief-template-content.component';
import { SharedModule } from '../shared/shared.module';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';
import { SharedFiltersModule } from '../shared-filters/shared-filters.module';
import { BriefTemplateFilterComponent } from './brief-template-filter/brief-template-filter.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { BriefTemplateTutorialComponent } from './brief-template-tutorial/brief-template-tutorial.component';
import { TourModule } from '../tour/tour.module';
import { ModalAssignPermissionComponent } from './modal-assign-permission/modal-assign-permission.component';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { FilterTemplateByRolPipe } from './pipes/filter-template-by-rol.pipe';
import { ModalAlertTemplateLibraryComponent } from './modal-alert-template-library/modal-alert-template-library.component';
import { ModalAlertEditTemplateComponent } from './modal-alert-edit-template/modal-alert-edit-template.component';
import { DropdownFilterAreaComponent } from './brief-template-filter/dropdown-filter-area/dropdown-filter-area.component';
import { FilterTemplateByAreaPipe } from './pipes/filter-template-by-area.pipe';



@NgModule({
  imports: [
    SharedModule,
    SharedSidenavModule,
    SharedFiltersModule,
    SharedComponentsModule,
    TourModule,
    SharedModalModule,
    BriefTemplateRoutingModule
  ],
  declarations: [
    BriefTemplateContentComponent,
    BriefTemplateHeaderComponent,
    BriefTemplateItemComponent,
    BriefTemplateSidenavComponent,
    BriefTemplateFilterComponent,
    DropdownFilterAreaComponent,
    BriefTemplateTutorialComponent,
    ModalAssignPermissionComponent,
    ModalAlertTemplateLibraryComponent,
    ModalAlertEditTemplateComponent,
    // Pipes
    FilterTemplateByRolPipe,
    FilterTemplateByAreaPipe
  ]
})
export class BriefTemplateModule { }
