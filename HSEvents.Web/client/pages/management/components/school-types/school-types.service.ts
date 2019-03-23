import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { SchoolType } from '../../../../models/school.models';

@Injectable()
export class SchoolTypeService {

    private apiBase: string = '/api/schoolType/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<SchoolType[]> {
        return this.client
            .get<SchoolType[]>(this.apiBase + 'getAll');
    }

    get(id: number): Observable<SchoolType> {
        return this.client
            .get<SchoolType>(this.apiBase + 'get', id);
    }

    add(type: SchoolType): Observable<SchoolType> {
        return this.client
            .put<SchoolType>(this.apiBase + 'add', type);
    }

    update(type: SchoolType): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', type);
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