import { Component, OnInit, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { GeneralService } from '../../../services/general/general.service';
import { ToastrService } from 'ngx-toastr';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Language } from '../../../models/languaje/language';
import { Rol } from '../../../models/workspace/rol';
import { ISubscription } from 'rxjs/Subscription';
import { UserStrategyService } from '../../../services/users/user-strategy.service';
import { RolStrategyService } from '../../../services/roles/rol-strategy.service';
import { LanguageStrategyService } from '../../../services/language/language-strategy.service';
import { User } from '../../../models/users/user';
@Component({
    selector: 'app-profile-user-account',
    templateUrl: './profile-user-account.component.html',
    styleUrls: ['./profile-user-account.component.scss']
})
export class ProfileUserAccountComponent implements OnInit, AfterContentInit, OnDestroy {

    public currentUser: User;
    public subscriptionParams: ISubscription;
    public workspaceAccess: WorkspaceAccess;
    public roles: Array<Rol>;
    public userConnectionStatuses = [];
    public languages: Array<Language>;
    public rolePermissions = [];
    public changePasswordAction = false;
    public newPassowrd = {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
    };
    public dummyUser: User;
    public subscriptionFormChange: ISubscription;
    public formHasChanged = false;
    public languageHasChanged = false;
    public permissionsCollapse = true;
    // Services
    private _workspaceAccessService;
    private _userService;
    private _rolService;
    private _languageService;
    // Subscription
    public subscriptionChangeUser: ISubscription;
    @ViewChild('formUser') formUser: NgForm;

    constructor(
        private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
        private _userStrategyService: UserStrategyService,
        private _rolesStartegyService: RolStrategyService,
        private _languageStrategyService: LanguageStrategyService,
        private _toastrService: ToastrService,
        private _generalService: GeneralService,
        private _authService: AuthenticationService
    ) {
        this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
        this._userService = this._userStrategyService.getService();
        this._rolService = this._rolesStartegyService.getService();
        this._languageService = this._languageStrategyService.getService();


        this._rolService.getAllRoles().subscribe(roles => {
            this.roles = roles.filter(r => r.key !== 'super-admin');
        });
        this._languageService.getLanguages().subscribe(languages => {
            this.languages = languages;
        });
        this._userService.getUserStatuses().subscribe(statuses => {
            this.userConnectionStatuses = statuses.filter(s => s !== 'offline');
        });

        // Auth
        this.currentUser = this._authService.getAuthUser();
        this.workspaceAccess = this._authService.getAuthWorkspaceAccess();

    }
    showChangePassword() {
        this.changePasswordAction = true;
    }

    ngOnInit() {
        this.formUser.statusChanges.subscribe(
            result => {
                this.formHasChanged = true;
            }
        );

        this._userService.getById(this.currentUser.id).subscribe(user => {
            const currentLanguage = this._languageService.getCurrentLanguage();
            const currentLanguageArray = this.languages.filter(l => l.code === currentLanguage.code)[0];
            this.currentUser = user;
            this.currentUser.language = currentLanguageArray;
            this.dummyUser = Object.assign({}, this.currentUser);

            setTimeout(() => {
                this.formHasChanged = false;
            });
        });

        this._workspaceAccessService
            .getRolesPermissions(this.workspaceAccess.id).
            subscribe(rolesPermissions => {
                this.rolePermissions = rolesPermissions;

            });





    }
    ngAfterContentInit() {
        this.subscriptionChangeUser = this._generalService.onChangeUserObs.subscribe(user => {
            this.currentUser.status = user.status;
            this.currentUser.profilePicture = user.profilePicture;
        });
    }
    togglePermissions() {
        this.permissionsCollapse = !this.permissionsCollapse;
    }
    onChangeLanguage($event) {
        this.languageHasChanged = true;
    }
    onChangeImage(file: File) {
        this._userService.changephotoUrl(this.workspaceAccess.user, file).subscribe(change => {
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
    // Save new user
    save() {
        // Disabled chnage

        this._userService.updateUser(this.dummyUser).subscribe(user => {

            this.currentUser = Object.assign({}, user);
            this._generalService.changeUser(this.currentUser);
            this.formHasChanged = false;
            if (this.languageHasChanged) {
                this._generalService.changeLanguage(this.dummyUser.language);
                this.languageHasChanged = false;
            }
            this._toastrService.info('Informacion actualizada con éxito');
        });

    }
    changePassword() {

        this._userService.resetPassword(this.currentUser.id, this.newPassowrd).subscribe(success => {
            this.changePasswordAction = false;
            if (success) {
                this._toastrService.info('Su contraseña ha sido actualizada con exito');
            }

            setTimeout(() => {
                this.formHasChanged = false;
            });
        });



    }

    cancelChangePassword() {

        this.changePasswordAction = false;
        setTimeout(() => {
            this.formHasChanged = false;
        });
    }

    ngOnDestroy() {
        if (this.subscriptionChangeUser) {

        }
    }

}