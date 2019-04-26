import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../services/hse-httpclient';

@Injectable()
export class StatisticService {

    private apiBase: string = '/api/statistic/';

    constructor(private client: HseHttpClient) { }

    getCostStats(): Observable<any[]> {
        return this.client
            .get<any[]>(this.apiBase + 'GetCostStats');
    }

    getSeasonStats(): Observable<any[]> {
        return this.client
            .get<any[]>(this.apiBase + 'GetSeasonStats');
    }

    getEventsCountStats(): Observable<any[]> {
        return this.client
            .get<any[]>(this.apiBase + 'GetEventsCountStats');
    }

    getCompetitionStats(): Observable<any[]> {
        return this.client
            .get<any[]>(this.apiBase + 'GetCompetitionStats');
    }

    getExamStats(): Observable<any[]> {
        return this.client
            .get<any[]>(this.apiBase + 'GetExamStats');
    }
}