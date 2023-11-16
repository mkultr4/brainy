import { NgModule } from '@angular/core';

import { WorkspacesRoutingModule } from './workspaces-routing.module';
import { WorkspacesContentComponent } from './workspaces-content/workspaces-content.component';
import { SharedModule } from '../shared/shared.module';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { WorkspaceBoxComponent } from './workspace-box/workspace-box.component';
import { WorkspaceLogoComponent } from './workspace-logo/workspace-logo.component';
import { WorkspacesFilterComponent } from './workspaces-filter/workspaces-filter.component';
import { DropdownFilterTypesComponent } from './workspaces-filter/dropdown-filter-types/dropdown-filter-types.component';
import { WorkspacesHeaderComponent } from './workspaces-header/workspaces-header.component';
import { SharedFiltersModule } from '../shared-filters/shared-filters.module';
import { FilterWorkspaceTypePipe } from './pipes/filter-workspace-type.pipe';
import { SharedInvitationsModule } from '../shared-invitations/shared-invitations.module';

@NgModule({
  imports: [
    SharedModule,
    SharedHeaderModule,
    SharedComponentsModule,
    SharedFiltersModule,
    SharedInvitationsModule,
    WorkspacesRoutingModule
  ],
  declarations: [
    WorkspacesContentComponent,
    WorkspaceBoxComponent,
    WorkspaceLogoComponent,
    WorkspacesFilterComponent,
    DropdownFilterTypesComponent,
    WorkspacesHeaderComponent,
    // Pipes
    FilterWorkspaceTypePipe
    
  ]
})
export class WorkspacesModule { }
