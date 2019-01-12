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
}