import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { City } from '../../../../models/address.models';
import { HseHttpParams } from '../../../../services/hse-httpparams';

@Injectable()
export class CityService {

    private apiBase: string = '/api/city/';

    constructor(private client: HseHttpClient) { }

    getAll(region?: string, cityType?: string): Observable<City[]> {
        if (!cityType && !region) //todo убрать после добавления фильтрации
            return this.client
                .get<City[]>(this.apiBase + 'getAll');

        var params = new HseHttpParams()
            .set('region', region)
            .set('type', cityType);

        return this.client
            .get<City[]>(this.apiBase + 'getAll', params.httpParams);
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

    deleteSeveral(ids: number[]): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'deleteSeveral', ids);
    }
}