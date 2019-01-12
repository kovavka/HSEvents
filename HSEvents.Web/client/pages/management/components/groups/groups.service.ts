import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Group } from '../../../../models/dictionaries.models';

@Injectable()
export class GroupService {

    private apiBase: string = '/api/group/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<Group[]> {
        return this.client
            .get<Group[]>(this.apiBase + 'getAll');
    }
}