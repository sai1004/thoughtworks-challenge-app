import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class ApexService {
    private _loaderSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
    private _blockSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private _domSanitizer: DomSanitizer, private zone: NgZone) {}

    bypassURL(url: string) {
        return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
    }

    showLoader(show: boolean) {
        this.zone.run(() => {
            this._loaderSubject.next(show);
        });
    }

    blockScreen(show: boolean) {
        this.zone.run(() => {
            this._blockSubject.next(show);
        });
    }

    loaderEvent(): Observable<boolean> {
        return this._loaderSubject.asObservable();
    }

    blockEvent(): Observable<boolean> {
        return this._blockSubject.asObservable();
    }
}
