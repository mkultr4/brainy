import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderWorkspaceLogoComponent } from './header-workspace-logo/header-workspace-logo.component';
import { HeaderDefaultComponent } from './header-default/header-default.component';
import { InterfaceMenuComponent } from './interface-menu/interface-menu.component';
import { InterfaceMenuFilterComponent } from './interface-menu-filter/interface-menu-filter.component';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { ModalChangeWorkspaceComponent } from './modal-change-workspace/modal-change-workspace.component';
import { MzInputModule } from 'ngx-materialize';
import { ModalChangeWorkspaceService } from './modal-change-workspace/modal-change-workspace.service';
import { ModalChangeLanguageComponent } from './modal-change-language/modal-change-language.component';

@NgModule({
  imports: [
    SharedModule,
    SharedModalModule,
    MzInputModule,
    SharedSidenavModule
  ],
  providers:[
    ModalChangeWorkspaceService,
  ],
  declarations: [
    HeaderWorkspaceLogoComponent,
    HeaderDefaultComponent,
    InterfaceMenuComponent,
    InterfaceMenuFilterComponent,
    UserDropdownComponent,
    InterfaceMenuFilterComponent,
    ModalChangeWorkspaceComponent,
    ModalChangeLanguageComponent
  ],
  exports: [
    HeaderWorkspaceLogoComponent,
    HeaderDefaultComponent,
    InterfaceMenuComponent,
    InterfaceMenuFilterComponent,
    UserDropdownComponent,
    InterfaceMenuFilterComponent,
    ModalChangeWorkspaceComponent,
    ModalChangeLanguageComponent
  ]
})
export class SharedHeaderModule { }
