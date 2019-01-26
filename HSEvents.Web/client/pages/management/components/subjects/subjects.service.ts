import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { SubjectModel } from '../../../../models/dictionaries.models';

@Injectable()
export class SubjectService {

    private apiBase: string = '/api/subject/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<SubjectModel[]> {
        return this.client
            .get<SubjectModel[]>(this.apiBase + 'getAll');
    }
}