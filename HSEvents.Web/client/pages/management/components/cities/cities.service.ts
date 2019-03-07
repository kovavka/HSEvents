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

    get(id: number): Observable<City> {
        return this.client
            .get<City>(this.apiBase + 'get', id);
    }

    add(City: City): Observable<City> {
        return this.client
            .put<City>(this.apiBase + 'add', City);
    }

    update(City: City): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', City);
    }

    delete(id: number): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'delete', id);
    }
}