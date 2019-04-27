import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { HseHttpParams } from '../../../../services/hse-httpparams';
import { Street } from '../../../../models/address.models';

@Injectable()
export class StreetService {

    private apiBase: string = '/api/street/';

    constructor(private client: HseHttpClient) { }

    getAll(cityId?: number): Observable<Street[]> {
        var params = new HseHttpParams()
            .set("cityId", cityId && cityId.toString());

        return this.client
            .get<Street[]>(this.apiBase + 'getAll', params.httpParams);
    }

    get(id: number): Observable<Street> {
        return this.client
            .get<Street>(this.apiBase + 'get', id);
    }

    add(street: Street): Observable<Street> {
        return this.client
            .put<Street>(this.apiBase + 'add', street);
    }

    update(street: Street): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', street);
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