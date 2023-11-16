import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rol } from '../../../../models/workspace/rol';
import { Invitation } from '../../../../models/invitations/invitation';
import { Brand } from '../../../../models/brands/brand';
import * as uuid from 'uuid/v4';
import { InvitationLevel } from '../../../../models/invitations/invitation-level';
import { RolStrategyService } from '../../../../services/roles/rol-strategy.service';
import { CategoryStrategyService } from '../../../../services/categories/category-strategy.service';
import { Category } from '../../../../models/categories/category';
@Component({
  selector: 'app-share-new-participants',
  templateUrl: './share-new-participants.component.html',
  styleUrls: ['./share-new-participants.component.scss']
})
export class ShareNewParticipantsComponent implements OnInit {
  // Invitation object
  public invitation: Invitation = new Invitation();
  // Roles
  public roles: Array<Rol>;
  // Brand
  public brands: Array<Brand>;
  // Categories
  public categories: Array<Category>;
  // New category
  public newCategory: Category = new Category();
  // Services
  private _rolService;
  private _categoryService;
  // Form
  @ViewChild('formGuest') private formGuest: NgForm;

  @Input() invitationLevelId = InvitationLevel.CORE;
  @Input() invitationReferenceId: string;
  @Input() brand: Brand;
  @Input() brainyObjectId;
  @Input() invitationEmail: string;

  // Output close parent modal
  @Output() newOnAddInvitation = new EventEmitter();

  constructor(
    private _rolStrategyService: RolStrategyService,
    private _categoryStartegyService: CategoryStrategyService,
  ) {
    this._rolService = this._rolStrategyService.getService();
    this._categoryService = this._categoryStartegyService.getService();
    this.invitation = new Invitation();

    this._rolService.getAllRoles().subscribe(roles => {
      this.roles = roles.filter(rol => rol.key !== 'super-admin' && rol.key !== 'admin');
    });
    this._categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
  /**On init */
  ngOnInit() {
    
  }



  categoryChange($event) {
    this.newCategory.name = '';
  }
  /** Send invitation*/
  invite() {
    this.invitation.id = uuid();
    this.invitation.email = this.invitationEmail;
    this.invitation.groupReference = 'comment';
    this.invitation.levelId = this.invitationLevelId;
    this.invitation.referenceId = this.invitationReferenceId;
    if (this.invitation.rol.key === 'guest') {
      if (this.invitation.category.id === 'newCategory') {
        this.invitation.category = this.newCategory;
      }
    }
    this.newOnAddInvitation.emit(this.invitation);

  }
}
