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
}