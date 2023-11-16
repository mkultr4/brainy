import { Component, OnInit, Input, Output, ViewChild, OnDestroy } from '@angular/core';
import { Invitation } from '../../../models/invitations/invitation';
import { Rol } from '../../../models/workspace/rol';
import { Category } from '../../../models/categories/category';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolStrategyService } from '../../../services/roles/rol-strategy.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';
import { CategoryStrategyService } from '../../../services/categories/category-strategy.service';
import { AnimateModalComponent } from '../../shared-modal/animate-modal/animate-modal.component';
import { InvitationLevel } from '../../../models/invitations/invitation-level';
import * as uuid from 'uuid/v4';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { BrandStrategyService } from 'src/app/services/brands/brand-strategy.service';
import { Brand } from 'src/app/models/brands/brand';
import { runInThisContext } from 'vm';
import { ContextualResponseTableSelectComponent } from '../../brief/brief-category-content/brief-response-type/brief-response-table/contextual-response-table-select/contextual-response-table-select.component';

@Component({
  selector: 'app-modal-team-invite',
  templateUrl: './modal-team-invite.component.html',
  styleUrls: ['./modal-team-invite.component.scss']
})
export class ModalTeamInviteComponent implements OnInit, OnDestroy{

  // Public vars
  public invitation: Invitation = new Invitation();
  // Brand
  public brandSelected: Brand = new Brand();
  public newBrand: Brand = new Brand();
  // Roles
  public roles: Array<Rol>;
  public btnInvitingParticipants = false;
  // Categories
  public categories: Array<Category>;
  public newCategory: Category = new Category();
  
  public workflowInvitation = false;
  public suggestionInvite = false;
  public brands:Array<Brand>;
  public email = 'alonso.montiel@teamknowlogy.com';
  // Services
  private _rolService;
  private _invitationsService;
  private _categoryService;
  private _brandService;
  // Inputs
  @Input() public invitations: Array<Invitation> = new Array<Invitation>();
  @Input() public workspaceAccess: WorkspaceAccess;
  // Outputs

  // Viewchilds
  @ViewChild('formGuest') private formGuest: NgForm;
  @ViewChild('formShare') private formShare: NgForm;
  // ViewChilds
  @ViewChild('modal') modal: AnimateModalComponent;
  // Constructor
  constructor(
    private _toastrService: ToastrService,
    private _invitationStrategyService: InvitationStrategyService,
    private _rolStrategyervice: RolStrategyService,
    private _categoryStrategyService: CategoryStrategyService,
    private _authService: AuthenticationService,
    private _branService: BrandStrategyService,
  ) {
    // Services
    this._invitationsService = this._invitationStrategyService.getService();
    this._categoryService = this._categoryStrategyService.getService();
    this._rolService = this._rolStrategyervice.getService();
    this._brandService = this._branService.getService();
    // Data
    this.invitation = new Invitation();
    this._rolService.getAllRoles().subscribe(roles => {
      this.roles = roles.filter(rol => rol.key !== 'super-admin' && rol.key !== 'admin');
    });
    this._categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
    this._brandService.findAll().subscribe(brand =>{
      this.brands = brand;
    });
  }
  // Init
  ngOnInit() {
  }
  // show modal
  showModal() {
    this.invitation = new Invitation();
    this.modal.showModal();
  }
  // On show modal
  modalOnShow() {

  }
  // close modal
  modalOnHide() {
    setTimeout(() => {
      this.clearForm();
    });
  }
  // Clear form
  private clearForm() {

    this.invitation = new Invitation();
    this.newBrand = new Brand();
    this.newCategory = new Category();
    
    this.invitations = [];
    this.workflowInvitation = false;
    this.btnInvitingParticipants = false;

  }

  // Workflow invitation
  onKeyUp(e) {
    const enterKey = 13;
    if (e.which === enterKey) {
      if (this.suggestionInvite) {
        this.showWorkflowInvitation();
      }
    }
  }

  onChangeEmail() {
    if (this.invitations.length > 0 && !this.workflowInvitation) {

      if (this.formShare.valid) {
        this.suggestionInvite = true;
      } else {
        this.suggestionInvite = false;
      }
    }
  }

  cancelSuggestion() {
    this.suggestionInvite = false;
    setTimeout(() => {
      this.brandSelected = new Brand();
      this.newCategory = new Category();      
    });
  }

  showWorkflowInvitation($event?) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.suggestionInvite = false;
    this.workflowInvitation = true;
  }

  cancelWorkfklowInvitation() {
    this.invitation.email = '';
    setTimeout(() => {
      this.workflowInvitation = false;
    });
  }
  categoryChange($event) {
    this.newCategory.name = '';
  
  }
  brandChange($event){
    this.newBrand.name = '';
  }
  // Is focused category
  isFocusedCategory(){
    let focused = false;
    if(this.brandSelected && this.brandSelected.id){
      if(this.brandSelected.id !== 'newBrand'){
        if(!this.invitation.category){
          focused = true;
        }
      }else{
        if(!this.invitation.category && this.newBrand.name.length > 0){
          focused = true;
        }
      }
    }
    // console.log(focused);
    return focused;
  }
  addOther() {
    if (this.formGuest.valid) {
      this.invitation.id = uuid();
      if (this.invitation.rol.key === 'guest') {
        if (this.invitation.category.id === 'newCategory') {
          this.invitation.category = this.newCategory;
        }
        if(this.brandSelected.id === 'newBrand'){
          this.invitation.brand = this.newBrand;
        }else{
          this.invitation.brand = this.brandSelected;
        }
      }
     
      this.invitation.levelId = InvitationLevel.WORKSPACE;
      this.invitation.referenceId = this.workspaceAccess.workspace.id;
      // Copy
      const copyInvitation = Object.assign(new Invitation(), this.invitation);
      // Push
      this.invitations.push(copyInvitation);

      
      
      setTimeout(() => {
        this.workflowInvitation = false;
        this.invitation = new Invitation();
        this.brandSelected = new Brand();
        this.newCategory = new Category();
        
      });

    }
  }
  /**
   * Send invitations
   */
  invite() {
    this.btnInvitingParticipants = true;
    this._invitationsService.createList(this.invitations).subscribe(() => {
      const length = this.invitations.length;
      this.modal.closeModal();
      setTimeout(() => {
        
        if(length > 1){
          this._toastrService.info('Se enviaron las nuevas altas.');
        }else{
          this._toastrService.info('Se envio la nueva alta.');
        }
        
        // this.clearForm();
      }, 900);
    });
  }

  /**
   * Delete invitation
   * @param invitation
   *
   */
  deleteInvitation(invitation: Invitation) {

    const index = this.invitations.indexOf(invitation);
    this.invitations.splice(index, 1);
    if (this.invitations.length === 0) {
      this.workflowInvitation = true;
    }
    if (this.invitations.length === 0) {
      this.invitation = this.invitation = new Invitation();
    }

  }
  // Destroy
  ngOnDestroy() {

  }
}
