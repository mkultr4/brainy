import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../../models/users/user';
import { WorkspaceAccess } from '../../models/workspace/workspace-access';
import { Language } from '../../models/languaje/language';
import { COLORS } from '../../data/mock-color';
import { environment } from '../../../environments/environment';
import { ICONS } from 'src/app/data/mock-icons';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    private onChangeUser: Subject<User> = new Subject();
    public onChangeUserObs: Observable<User>;

    private onChangeWorkspaceAccess: Subject<WorkspaceAccess> = new Subject();
    public onChangeWorkspaceAccessObs: Observable<WorkspaceAccess>;

    private onChangeLanguage: Subject<Language> = new Subject();
    public onChangeLanguageObs: Observable<Language>;

    constructor() {
        this.onChangeUserObs = this.onChangeUser.asObservable();
        this.onChangeLanguageObs = this.onChangeLanguage.asObservable();
    }

    changeUser(user: User) {
        this.onChangeUser.next(user);
    }
    changeWorkspaceAccess(workspaceAccess: WorkspaceAccess) {
        this.onChangeWorkspaceAccess.next(workspaceAccess);
    }

    changeLanguage(lang: Language) {

        this.onChangeLanguage.next(Object.assign({}, lang));
    }

    getColors() {

        return COLORS;

    }
    getIcons() {
        return ICONS;
    }


}
