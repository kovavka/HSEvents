import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Department } from '../../../../models/dictionaries.models';

@Injectable()
export class DepartmentService {

    private apiBase: string = '/api/department/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<Department[]> {
        return this.client
            .get<Department[]>(this.apiBase + 'getAll');
    }

    get(id: number): Observable<Department> {
        return this.client
            .get<Department>(this.apiBase + 'get', id);
    }

    add(subject: Department): Observable<Department> {
        return this.client
            .put<Department>(this.apiBase + 'add', subject);
    }

    update(subject: Department): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', subject);
    }

    delete(id: number): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'delete', id);
    }
}