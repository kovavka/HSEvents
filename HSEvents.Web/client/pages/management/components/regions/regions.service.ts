import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Region } from '../../../../models/address.models';
import { HseHttpParams } from '../../../../services/hse-httpparams';

@Injectable()
export class RegionService {

    private apiBase: string = '/api/region/';

    constructor(private client: HseHttpClient) { }

    getAll(country?: string): Observable<Region[]> {
        if (!country) //Todo: это нужно убрать, когда будет фильтрация на странице с регионами
            return this.client
                .get<Region[]>(this.apiBase + 'getAll');

        var params = new HseHttpParams().set('country', country);
        return this.client
            .get<Region[]>(this.apiBase + 'getAll', params.httpParams);
    }

    get(id: number): Observable<Region> {
        return this.client
            .get<Region>(this.apiBase + 'get', id);
    }

    add(Region: Region): Observable<Region> {
        return this.client
            .put<Region>(this.apiBase + 'add', Region);
    }

    update(Region: Region): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', Region);
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