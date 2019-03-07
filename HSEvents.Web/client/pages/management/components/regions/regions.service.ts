﻿import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../../../services/hse-httpclient';
import { Region } from '../../../../models/address.models';

@Injectable()
export class RegionService {

    private apiBase: string = '/api/region/';

    constructor(private client: HseHttpClient) { }

    getAll(): Observable<Region[]> {
        return this.client
            .get<Region[]>(this.apiBase + 'getAll');
    }

    get(id: number): Observable<Region> {
        return this.client
            .get<Region>(this.apiBase + 'get', id);
    }

    add(Region: Region): Observable<Region> {
        return this.client
            .put<Region>(this.apiBase + 'add', Region);
    }

    update(Region: Region): Observable<any> {
        return this.client
            .put<any>(this.apiBase + 'update', Region);
    }

    delete(id: number): Observable<any> {
        return this.client
            .post<any>(this.apiBase + 'delete', id);
    }
}