import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HseHttpClient } from '../../services/hse-httpclient';
import { Month, EventModel } from './models/event.models';

@Injectable()
export class EventsService {

	constructor(private  client: HseHttpClient) { }

	getMonth(year: number, month: number): Observable<Month>  {
		return this.client
			.get<Month>('/api/events/getMonth?month=' + month + '&year=' + year);
	}

	get(id: number): Observable<EventModel> {
		return this.client
			.get<EventModel>('/api/events/get?id=' + id);
	}

	add(event: EventModel): Observable<EventModel> {
		return this.client
			.put<EventModel>('/api/events/add', event);
	}

	update(event: EventModel): Observable<any> {
		return this.client.put('/api/events/update', event);
	}

	delete(id: number): Observable<any> {
		return this.client.post('/api/events/delete?id='+ id);
	}
}