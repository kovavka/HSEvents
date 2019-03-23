import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Group } from '../../../../models/dictionaries.models';

@Injectable()
export class GroupService {

    private apiBase: string = '/api/group/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<Group[]> {
        return this.client
            .get<Group[]>(this.apiBase + 'getAll');
    }

    get(id: number): Observable<Group> {
        return this.client
            .get<Group>(this.apiBase + 'get', id);
    }

    add(group: Group): Observable<Group> {
        return this.client
            .put<Group>(this.apiBase + 'add', group);
    }

    update(group: Group): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', group);
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