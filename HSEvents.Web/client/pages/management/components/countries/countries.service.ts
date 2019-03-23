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

    get(id: number): Observable<Country> {
        return this.client
            .get<Country>(this.apiBase + 'get', id);
    }

    add(country: Country): Observable<Country> {
        return this.client
            .put<Country>(this.apiBase + 'add', country);
    }

    update(country: Country): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', country);
    }

    delete(id: number): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'delete', id);
    }

    deleteSeveral(ids: number[]): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'deleteSeveral', ids);
    }
}