import { NgModule } from '@angular/core';
import { ProfileActivityRoutingModule } from './profile-activity-routing.module';
import { ProfileActivityContentComponent } from './profile-activity-content/profile-activity-content.component';
import { ProfileActivityTableComponent } from './profile-activity-table/profile-activity-table.component';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ProfileActivityCoresTableComponent } from './profile-activity-cores-table/profile-activity-cores-table.component';
import { ActivityFilterBrandComponent } from './activity-filter-brand/activity-filter-brand.component';
import { ActivityFilterProjectComponent } from './activity-filter-project/activity-filter-project.component';
import { ActivityFilterTypeComponent } from './activity-filter-type/activity-filter-type.component';
import { MzSelectModule, MzCheckboxModule } from 'ngx-materialize';
import { ModalAssignProjectComponent } from './modal-assign-project/modal-assign-project.component';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { ModalUnlinkProjectComponent } from './modal-unlink-project/modal-unlink-project.component';

@NgModule({
  imports: [
    SharedModule,
    MzSelectModule,
    SharedComponentsModule,
    SharedModalModule,
    MzCheckboxModule,
    ProfileActivityRoutingModule
  ],
  declarations: [
    ProfileActivityContentComponent,
    ProfileActivityCoresTableComponent,
    ProfileActivityTableComponent,
    ActivityFilterBrandComponent,
    ActivityFilterProjectComponent,
    ActivityFilterTypeComponent,
    ModalAssignProjectComponent,
    ModalUnlinkProjectComponent
  ],
  exports: [
    ProfileActivityContentComponent,
    ProfileActivityCoresTableComponent,
    ProfileActivityTableComponent,
    ActivityFilterBrandComponent,
    ActivityFilterProjectComponent,
    ActivityFilterTypeComponent,
    ModalAssignProjectComponent,
    ModalUnlinkProjectComponent
  ]
})
export class ProfileActivityModule { }
