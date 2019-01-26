import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { CityType } from '../../../../models/address.models';

@Injectable()
export class CityTypeService {

    private apiBase: string = '/api/cityType/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<CityType[]> {
        return this.client
            .get<CityType[]>(this.apiBase + 'getAll');
    }

    get(id: number): Observable<CityType> {
        return this.client
            .get<CityType>(this.apiBase + 'get', id);
    }

    add(type: CityType): Observable<CityType> {
        return this.client
            .put<CityType>(this.apiBase + 'add', type);
    }

    update(type: CityType): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', type);
    }

    delete(id: number): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'delete', id);
    }
}