import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../services/hse-httpclient';

@Injectable()
export class StatisticService {

    private apiBase: string = '/api/statistic/';

    constructor(private client: HseHttpClient) { }

    getExamStats(): Observable<any[]> {
        return this.client
            .get<any[]>(this.apiBase + 'GetExamStats');
    }
}