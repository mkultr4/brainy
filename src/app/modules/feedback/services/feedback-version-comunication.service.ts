import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as uuid from 'uuid/v4';
import { Piece } from '../../../models/feedback/piece';
export class VersionComunication {
    show = false;
    feedbackPiece: Piece;
}
export class ComparedVersion {
    id: string;
    order = 0;
    empty = true;
    piece: Piece;
    constructor() {
        this.id = uuid();
        this.piece = new Piece();
    }
}

@Injectable()
export class FeedbackVersionComunicationService {

    private showVersion$: BehaviorSubject<VersionComunication>;
    public showVersionObs: Observable<VersionComunication>;

    private dataStore: {
        compareVersions: Array<ComparedVersion>
    };
    private _compareVersions: BehaviorSubject<ComparedVersion[]>;
    public compareVersionsObs: Observable<ComparedVersion[]>;

    constructor() {

        this.dataStore = { compareVersions: new Array<ComparedVersion>() };

        this.showVersion$ = new BehaviorSubject(new VersionComunication());
        this.showVersionObs = this.showVersion$.asObservable();


        this._compareVersions = <BehaviorSubject<ComparedVersion[]>>new BehaviorSubject([]);
        this.compareVersionsObs = this._compareVersions.asObservable();
    }

    showVersion(versionComunication: VersionComunication) {
        this.showVersion$.next(versionComunication);
    }

    loadCompareVersions(compareVersions?: Array<ComparedVersion>) {
        if (compareVersions && compareVersions.length > 0) {
            this.dataStore.compareVersions = Object.assign([], compareVersions);
        } else {
            this.dataStore.compareVersions = new Array<ComparedVersion>();
        }
        this._compareVersions.next(Object.assign(new Array<ComparedVersion>(), this.dataStore).compareVersions);
    }
    // Add compare version
    addCompareVersion(piece: Piece) {
        if (this.dataStore.compareVersions.length === 0) {
            const arrayDefault = this.createDefaultCompare(piece);
            this.dataStore.compareVersions = arrayDefault;
        } else {
            const exist = this.dataStore.compareVersions.filter(c => c.piece.id === piece.id);
            if (exist.length > 0) {
                exist[0].empty = true;
                exist[0].piece = new Piece();
            } else {
                const comparedVersions = this.dataStore.compareVersions.filter(c => c.empty === false);
                if (comparedVersions.length === 4) {
                    comparedVersions[0].piece = piece;
                } else {
                    const compare = this.dataStore.compareVersions.filter(c => c.empty === true)[0];
                    compare.empty = false;
                    compare.piece = piece;
                }
            }
        }

        this._compareVersions.next(Object.assign({}, this.dataStore).compareVersions);
    }
    // Create default array
    private createDefaultCompare(piece: Piece) {
        const arrayCompareDefult = new Array<ComparedVersion>();
        for (let i = 0; i < 4; i++) {
            const compare = new ComparedVersion();
            compare.order = i;
            if (i === 0) {
                compare.empty = false;
                compare.piece = piece;
            }
            arrayCompareDefult.push(compare);
        }

        return arrayCompareDefult;
    }
    // Replace compare version
    replaceCompareVersion(piece: Piece, compare: ComparedVersion) {
        const exist = this.dataStore.compareVersions.filter(c => c.piece.id === piece.id);
        if (exist.length > 0) {
            exist[0].empty = true;
            exist[0].piece = new Piece();
        }
        this.dataStore.compareVersions.forEach((value, index) => {
            if (value.id === compare.id) {
                this.dataStore.compareVersions[index].piece = piece;
                if (this.dataStore.compareVersions[index].empty) {
                    this.dataStore.compareVersions[index].empty = false;
                }
            }
        });
        this._compareVersions.next(Object.assign({}, this.dataStore).compareVersions);
    }
    // Remove compare version
    removeCompareVersion(pieceId: string) {
        this.dataStore.compareVersions.forEach((c, i) => {

            if (c.piece.id === pieceId) {
                this.dataStore.compareVersions[i].piece = new Piece();
                this.dataStore.compareVersions[i].empty = true;
            }
        });

        this._compareVersions.next(Object.assign({}, this.dataStore).compareVersions);

    }


}
