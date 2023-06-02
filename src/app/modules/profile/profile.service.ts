import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    // https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json

    private profileURL: string = '/adminui-problem';

    constructor(private _http: HttpService) {}

    getProfilesList() {
        return this._http.get(this.profileURL + '/members.json');
    }
}
