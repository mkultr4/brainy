import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalChangeWorkspaceService {

    private subjectShow: Subject<boolean>;
    public observableShow: Observable<boolean>;

    constructor() {
        this.subjectShow = new Subject();
        this.observableShow = this.subjectShow.asObservable();
    }
    /**
     * Show modal
     * @param show 
     */
    showModal(show: boolean) {
        this.subjectShow.next(show);
    }

    changeWorkspace() {

    }

}
