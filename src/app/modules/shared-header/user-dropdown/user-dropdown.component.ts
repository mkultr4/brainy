import { Component, OnInit, Input, AfterContentInit, OnDestroy} from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Language } from '../../../models/languaje/language';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { User } from '../../../models/users/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from '../../../services/general/general.service';
import { RolService } from '../../../services/roles/rol.service';
import { LanguageStrategyService } from '../../../services/language/language-strategy.service';
import { UserStrategyService } from '../../../services/users/user-strategy.service';
import { ModalChangeWorkspaceService } from '../modal-change-workspace/modal-change-workspace.service';
import { HeaderWorkflowService } from '../services/header-workflow.service';


@Component({
  selector: 'app-user-dropdown,[app-user-dropdown]',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit, AfterContentInit, OnDestroy {
  // Public vars
  public languagesColumnize: Array<any>;
  public currentLanguage: Language;
  public isAdmin = false;
  public userConnectionStatuses = [];
  // Subscriptions
  private subscriptionChangeUser: ISubscription;
  // Services
  private _languageService;
  private _userService;
  @Input() currentUser: User;
  @Input() workspaceAccess: WorkspaceAccess;
  // Constructor
  constructor(
    private _router: Router,
    private _languageStartegyService: LanguageStrategyService,
    private _userStrategyService: UserStrategyService,
    private _authService: AuthenticationService,
    private _toastrService: ToastrService,
    private _generalService: GeneralService,
    private _modalChangeWorkspaceService: ModalChangeWorkspaceService,
    private _headerWorkflowService: HeaderWorkflowService
  ) {
    this._userService = this._userStrategyService.getService();
    this._languageService = this._languageStartegyService.getService();
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.languagesColumnize = this._languageService.getLanguagesColumns(2);
    this.currentLanguage = this._languageService.getCurrentLanguage();


    this._userService.getUserStatuses().subscribe(statuses => {
      this.userConnectionStatuses = statuses.filter(s => s !== 'offline');
    });
    this.isAdmin = RolService.isAdminRol(this.workspaceAccess.rol.key);

    this.subscriptionChangeUser = this._generalService.onChangeUserObs.subscribe(user => {
      this.currentUser.status = user.status;
      this.currentUser.profilePicture = user.profilePicture;
    });
  }
  // Open modal change language
  changeLanguage() {
      this._headerWorkflowService.onShowModalLanguage(true);
  }
  setLocale(lang: Language) {
    this.currentLanguage = lang;
    this._languageService.setLanguage(lang);
  }
  changeWorkspace() {
    this._modalChangeWorkspaceService.showModal(true);
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/public/login']);
  }
  onChangeImage(file: File) {
    this._userService.changephotoUrl(this.currentUser, file).subscribe(change => {
      if (change) {
        this._toastrService.info('Imagen de perfil cambiada con éxito');
        this._generalService.changeUser(this.currentUser);
      } else {
        this._toastrService.error('No se pudo cambiar la imagen de perfil');
      }
    });
  }
  onChangeStatus(statusParam: string) {
    this._userService.setStatusconnection(this.currentUser, statusParam).subscribe(status => {
      this.currentUser.status = status;
      this._generalService.changeUser(this.currentUser);
    });
  }
  ngOnDestroy() {

    if (this.subscriptionChangeUser) {
      this.subscriptionChangeUser.unsubscribe();
    }
  }

}

