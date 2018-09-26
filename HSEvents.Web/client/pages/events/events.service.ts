import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../services/hse-httpclient';
import { Month, Event } from './models/calendar.models';

@Injectable()
export class EventsService {

	constructor(private  client: HseHttpClient) { }

	getMonth(year: number, month: number): Observable<Month>  {
		return this.client
			.get<Month>('/api/events/getMonth?month=' + month + '&year=' + year);
	}

	get(id: number): Observable<Event> {
		return this.client
			.get<Event>('/api/events/get?id=' + id);
	}

	add(event: Event): Observable<Event> {
		return this.client
			.put<Event>('/api/events/add', event);
	}

	update(event: Event) {
		this.client.put('/api/events/update', event);
	}

	delete(id: number) {
		this.client.post('/api/events/delete', event);
	}
}