import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { City } from '../../../../models/address.models';

@Injectable()
export class CityService {

    private apiBase: string = '/api/city/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<City[]> {
        return this.client
            .get<City[]>(this.apiBase + 'getAll');
    }
}