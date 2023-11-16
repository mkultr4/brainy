import { Component, OnInit, Input, AfterContentInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { RolService } from '../../../services/roles/rol.service';
import { ISubscription } from 'rxjs/Subscription';
import { NotificationStrategyService } from '../../../services/notifications/notification-strategy.service';
@Component({
  selector: 'app-interface-menu',
  templateUrl: './interface-menu.component.html',
  styleUrls: ['./interface-menu.component.scss']
})
export class InterfaceMenuComponent implements OnInit, AfterContentInit, OnDestroy {
  public isShowDropdownUser = false;

  public isAdmin = false;
  public unreadNotifications = 0;
  // Services
  private _notificationService;
  // Subscription
  subscriptionNotifications: ISubscription;
  @Input() currentUser: User;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() sectionActive = '';
  @Input() avatarClass: string;
  // Constructor
  constructor(
    private _notificationStrategyService: NotificationStrategyService
  ) {
    this._notificationService = this._notificationStrategyService.getService();
  }

  ngOnInit() {
    this.subscriptionNotifications = this._notificationService.notifications.subscribe(notifications => {
      this.unreadNotifications = notifications.filter(notification => notification.read === false).length;
    });

  }
  ngAfterContentInit() {

    this.isAdmin = RolService.isAdminRol(this.workspaceAccess.rol.key);

  }

  onHideDropdownUser($event) {
    this.isShowDropdownUser = false;
  }
  onShowDropdownUser($event) {
    this.isShowDropdownUser = true;
  }

  ngOnDestroy() {

  }

}
