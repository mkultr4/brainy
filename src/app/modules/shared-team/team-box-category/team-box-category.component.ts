import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MzDropdownBrainyComponent } from '../../shared/mz-dropdown-brainy/mz-dropdown-brainy.component';
import { Category } from '../../../models/categories/category';
import { Subscription } from 'rxjs/Subscription';
import { GroupService } from '../../../services/group/group.service';
import { User } from '../../../models/users/user';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { Group } from '../../../models/group/group';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access'
import { Brand } from 'src/app/models/brands/brand';



@Component({
  selector: 'app-team-box-category,[app-team-box-category]',
  templateUrl: './team-box-category.component.html',
  styleUrls: ['./team-box-category.component.scss']
})
export class TeamBoxCategoryComponent implements OnInit {
  public workspaceAccess: WorkspaceAccess;
  //Privates
  private type;
  private reference;
  public currentUser: User;
  @Input() category: Group;
  @Input() brands: Array<Brand>;
  @Input() workspacAccess:Array<WorkspaceAccess>;
  //Subscription
  public groupSubscription: Subscription;
  @Input() categoryx: Category;
  @Input() viewUrl = '/team/group/';
  // Outputs
  @Output() boxOnDelete = new EventEmitter();
  @Output() boxOnEdit = new EventEmitter();
  // View child
  @ViewChild('menu', { read: MzDropdownBrainyComponent }) menu: MzDropdownBrainyComponent;
  constructor(
    private _GroupService: GroupService,
    private _router: Router,
    private route: ActivatedRoute,
    private _authService: AuthenticationService,
    private authService: AuthenticationService
  ) {

  }

  ngOnInit() {

  }
  viewCategory() {
    this._router.navigate([this.viewUrl, this.category.id], { relativeTo: this.route });
  }
  mouseleave() {
    this.menu.close();
  }
  delete() {
    this.boxOnDelete.emit(this.category);
  }
  edit() {
    this.boxOnEdit.emit(this.category);
  }
}
