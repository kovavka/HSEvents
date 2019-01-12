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
}