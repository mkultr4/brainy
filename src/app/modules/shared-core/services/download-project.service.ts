import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Core } from '../../../models/cores/core';
@Injectable()
export class DownloadProjectService {

    private subjectDownload: Subject<Core> = new Subject<Core>();
    public obsDownload: Observable<Core>;
    constructor() {
        this.obsDownload = this.subjectDownload.asObservable();
    }

    downloadProjectShow(core: Core) {
        console.log('service',core);
        this.subjectDownload.next(Object.assign({}, core));
    }
    getDownloadName(core) {
        if (environment.envName === 'design') {
            return '  Nespresso_arte.pdf';
        } else {
            return '  Nespresso_arte.pdf';
        }
    }
    downloadProject(core) {
        if (environment.envName === 'design') {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('assets/data/download.pdf');
                }, 2000);
            });
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('assets/data/download.pdf');
                }, 2000);
            });
        }
    }
}
