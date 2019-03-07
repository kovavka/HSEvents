import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { School } from '../../../../models/school.models';

@Injectable()
export class SchoolService {

    private apiBase: string = '/api/school/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<School[]> {
        return this.client
            .get<School[]>(this.apiBase + 'getAll');
    }

    get(id: number): Observable<School> {
        return this.client
            .get<School>(this.apiBase + 'get', id);
    }

    add(School: School): Observable<School> {
        return this.client
            .put<School>(this.apiBase + 'add', School);
    }

    update(School: School): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', School);
    }

    delete(id: number): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'delete', id);
    }
}