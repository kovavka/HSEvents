import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Street } from '../../../../models/address.models';

@Injectable()
export class StreetService {

    private apiBase: string = '/api/street/';

    constructor(private client: HseHttpClient) { }

    getAll(city?: string): Observable<Street[]> {
        if (!city) //todo убрать после добавления фильтрации
            return this.client
                .get<Street[]>(this.apiBase + 'getAll');

        return this.client
            .get<Street[]>(this.apiBase + 'getAll', city);
    }

    get(id: number): Observable<Street> {
        return this.client
            .get<Street>(this.apiBase + 'get', id);
    }

    add(Street: Street): Observable<Street> {
        return this.client
            .put<Street>(this.apiBase + 'add', Street);
    }

    update(Street: Street): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', Street);
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