import { Component } from '@angular/core';
import { Event } from './models/calendar.models';
import { EventsService } from './events.service';

@Component({
    moduleId: module.id.toString(),
	templateUrl: 'events.component.html',
	styleUrls: ['events.component.css'],
    providers: [EventsService]
})
export class EventsComponent {

	showCalendar: boolean = true;
	event: Event = null;
	date: Date = null;


	constructor(private eventsService: EventsService) {
	}

	onEditClick(id: number) {
		console.log('edit ' + id);
		this.eventsService.get(id)
			.subscribe(event => {
					this.event = event;
					this.showCalendar = false;
				}
			);
	}

	onDeleteClick(id: number) {
		console.log('delete ' + id);
	}

	onDayClick($event) {
		this.event = null;
		this.date = $event;
		this.showCalendar = false;
	}

}