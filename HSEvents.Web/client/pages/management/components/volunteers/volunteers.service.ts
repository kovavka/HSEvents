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
}