import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Region } from '../../../../models/address.models';

@Injectable()
export class RegionService {

    private apiBase: string = '/api/region/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<Region[]> {
        return this.client
            .get<Region[]>(this.apiBase + 'getAll');
    }
}