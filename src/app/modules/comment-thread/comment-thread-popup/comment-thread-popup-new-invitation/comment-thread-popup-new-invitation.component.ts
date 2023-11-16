import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import * as uuid from 'uuid/v4';
import { Invitation } from '../../../../models/invitations/invitation';
import { Rol } from '../../../../models/workspace/rol';
import { Category } from '../../../../models/categories/category';
import { MzSelectDirective } from 'ngx-materialize';
import { Brand } from 'src/app/models/brands/brand';

@Component({
  selector: 'app-comment-thread-popup-new-invitation,[app-comment-thread-popup-new-invitation]',
  templateUrl: './comment-thread-popup-new-invitation.component.html',
  styleUrls: ['./comment-thread-popup-new-invitation.component.scss']
})
export class CommentThreadPopupNewInvitationComponent implements OnInit {

  // Invitation object
  public invitation: Invitation = new Invitation();
  public newBrand: Brand = new Brand();
  // New category
  public newCategory: Category = new Category();
  @Input() coreType;
  @Input() coreId;
  @Input() invitationEmail: string;
  @Input() invitationLevelAccess = 'CORE';
  @Input() categories: Array<Category>;
  @Input() roles: Array<Rol>;
  // Output close parent modal
  @Output() commentOnAddInvitation = new EventEmitter();
  // View child
  @ViewChild('selectRol') selectRol: MzSelectDirective;
  constructor(
  ) {


    this.invitation = new Invitation();

  }
  /**On init */
  ngOnInit() {
  }

  categoryChange($event) {
    this.newCategory.name = '';
  }

  brandChange($event){
    this.newBrand.name = '';
  }
  /** Send invitation*/
  invite($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.invitation.id = uuid();
    this.invitation.email = this.invitationEmail;
    this.invitation.groupReference = 'comment';
    this.invitation.levelId = this.invitationLevelAccess;
    this.invitation.referenceId = this.coreId;
    if (this.invitation.rol.key === 'guest') {
      if (this.invitation.category.id === 'newCategory') {
        this.invitation.category = this.newCategory;
      }
    }
    this.invitation.referenceId = this.coreId;
    this.commentOnAddInvitation.emit(this.invitation);

  }


}
