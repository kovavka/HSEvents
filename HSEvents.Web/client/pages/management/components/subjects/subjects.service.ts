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

    get(id: number): Observable<SubjectModel> {
        return this.client
            .get<SubjectModel>(this.apiBase + 'get', id);
    }

    add(subject: SubjectModel): Observable<SubjectModel> {
        return this.client
            .put<SubjectModel>(this.apiBase + 'add', subject);
    }

    update(subject: SubjectModel): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', subject);
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