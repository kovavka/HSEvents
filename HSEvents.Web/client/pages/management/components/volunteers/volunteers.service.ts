import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Volunteer } from '../../../../models/dictionaries.models';

@Injectable()
export class VolunteerService {

    private apiBase: string = '/api/volunteer/';

	constructor(private  client: HseHttpClient) { }

    getAll(): Observable<Volunteer[]> {
        return this.client
            .get<Volunteer[]>(this.apiBase + 'getAll');
    }

    get(id: number): Observable<Volunteer> {
        return this.client
            .get<Volunteer>(this.apiBase + 'get', id);
    }

    add(Volunteer: Volunteer): Observable<Volunteer> {
        return this.client
            .put<Volunteer>(this.apiBase + 'add', Volunteer);
    }

    update(Volunteer: Volunteer): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', Volunteer);
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