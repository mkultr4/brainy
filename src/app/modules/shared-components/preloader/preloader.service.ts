import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class PreloaderService {

    private showPreloaderSubject: Subject<boolean>;
    public showPreloaderObs: Observable<boolean>;


    constructor() {
        this.showPreloaderSubject = new Subject<boolean>();
        this.showPreloaderObs = this.showPreloaderSubject.asObservable();
    }


    public showPreloader(show: boolean) {
        this.showPreloaderSubject.next( show );
    }

}
