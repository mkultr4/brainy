import { NgModule } from '@angular/core';
import { PreloaderService } from './preloader/preloader.service';
import { PreloaderComponent } from './preloader/preloader.component';
import { SharedModule } from '../shared/shared.module';
import { InterfaceFooterComponent } from './interface-footer/interface-footer.component';
import { InputFieldSearchNavComponent } from './input-field-search-nav/input-field-search-nav.component';
import { NotificationComponent } from './notification/notification.component';
import { SidenavNotificationsComponent } from './sidenav-notifications/sidenav-notifications.component';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';
import { TablePermissionsComponent } from './table-permissions/table-permissions.component';
import { SidenavPermissionsComponent } from './sidenav-permissions/sidenav-permissions.component';
@NgModule({
  imports: [
    SharedModule,
    SharedSidenavModule
  ],
  providers: [
    PreloaderService
  ],
  declarations: [
    PreloaderComponent,
    InterfaceFooterComponent,
    InputFieldSearchNavComponent,
    NotificationComponent,
    SidenavNotificationsComponent,
    TablePermissionsComponent,
    SidenavPermissionsComponent
  ],
  exports: [
    PreloaderComponent,
    InterfaceFooterComponent,
    InputFieldSearchNavComponent,
    NotificationComponent,
    SidenavNotificationsComponent,
    TablePermissionsComponent,
    SidenavPermissionsComponent
  ]
})
export class SharedComponentsModule { }
