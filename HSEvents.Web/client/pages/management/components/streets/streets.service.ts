import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Street } from '../../../../models/address.models';

@Injectable()
export class StreetService {

    private apiBase: string = '/api/street/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<Street[]> {
        return this.client
            .get<Street[]>(this.apiBase + 'getAll');
    }
}