import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Month, Week } from '../../models/calendar.models';
import { EventsService } from '../../events.service';

declare var jQuery;

@Component({
	moduleId: module.id.toString(),
	selector: 'event-card',
	templateUrl: 'event-card.component.html',
	styleUrls: ['../calendar.component.css'],
	providers: [EventsService]
})
export class EventCardComponent {

	event: Event;

	constructor(private eventsService: EventsService,
		private changeDetector: ChangeDetectorRef) {
		
	}

	show(event: any) {
		this.event = event; 
		console.log('show');
		console.log(event);
	}
}
