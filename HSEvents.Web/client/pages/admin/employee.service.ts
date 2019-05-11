import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../services/hse-httpclient';
import { Employee } from '../../models/user.models';

@Injectable()
export class EmployeeService {

    private apiBase: string = '/api/employee/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<Employee[]> {
        return this.client
            .get<Employee[]>(this.apiBase + 'getAll');
    }

    get(id: number): Observable<Employee> {
        return this.client
            .get<Employee>(this.apiBase + 'get', id);
    }

    add(employee: Employee): Observable<Employee> {
        return this.client
            .put<Employee>(this.apiBase + 'add', employee);
    }

    update(employee: Employee): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', employee);
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