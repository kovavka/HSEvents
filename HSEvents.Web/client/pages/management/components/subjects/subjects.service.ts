import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Subject } from '../../../../models/dictionaries.models';

@Injectable()
export class SubjectService {

    private apiBase: string = '/api/subject/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<Subject[]> {
        return this.client
            .get<Subject[]>(this.apiBase + 'getAll');
    }
}