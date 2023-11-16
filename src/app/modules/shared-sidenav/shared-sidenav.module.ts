import { NgModule } from '@angular/core';
import { AsidenavComponent } from './asidenav/asidenav.component';
import { SidenavComponent } from './asidenav/sidenav/sidenav.component';
import { SidenavButtonDirective } from './asidenav/sidenav-button/sidenav-button.directive';


@NgModule({
  imports: [
  ],
  declarations: [
    AsidenavComponent,
    SidenavComponent,
    SidenavButtonDirective
  ], exports: [
    AsidenavComponent,
    SidenavComponent,
    SidenavButtonDirective
  ]
})
export class SharedSidenavModule { }
