import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Country } from '../../../../models/address.models';

@Injectable()
export class CountryService {

    private apiBase: string = '/api/country/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<Country[]> {
        return this.client
            .get<Country[]>(this.apiBase + 'getAll');
    }
}