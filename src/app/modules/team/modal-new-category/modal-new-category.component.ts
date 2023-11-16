import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Category } from '../../../models/categories/category';
import { ModalFloatingComponent } from '../../shared/modal-floating/modal-floating.component';
import {TeamGroupsComponent } from '../../team/team-groups/team-groups.component'
import { Subscription } from 'rxjs/Subscription';
import { MyProfileService } from '../../../services/myProfile/my-profile.service';
import { Group } from '../../../models/group/group'
import { from } from 'rxjs';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { viewParentEl } from '@angular/core/src/view/util';
import { CategoryStrategyService } from 'src/app/services/categories/category-strategy.service';

@Component({
  selector: 'app-modal-new-category',
  templateUrl: './modal-new-category.component.html',
  styleUrls: ['./modal-new-category.component.scss']
})
export class ModalNewCategoryComponent implements OnInit {
  public newCategory = new Category();
  @ViewChild('modal') modal: ModalFloatingComponent;
  @ViewChild('newCategoryNameInput') newCategoryNameInput: ElementRef;
  @Output() modalOnCreateCategory = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  cancel() {
    this.modal.hideModal();
  }
  save() {
    this.modalOnCreateCategory.emit(Object.assign(new Category(), this.newCategory));
    this.modal.hideModal();
  }
  onShow() {
    setTimeout(() => {
      this.newCategoryNameInput.nativeElement.focus();
    });
  }
  onHide() {
    setTimeout(() => {
      this.newCategory.name = '';
    }, 500);
  }

}
