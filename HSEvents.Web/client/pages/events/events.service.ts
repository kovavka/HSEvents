﻿import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../services/hse-httpclient';
import { Month } from './models/calendar.models';

@Injectable()
export class EventsService {

	constructor(private  client: HseHttpClient) { }

	getMonth(year: number, month: number): Observable<Month>  {
		return this.client
			.get<Month>('/api/events/getMonth?month=' + month + '&year=' + year);
	}
}