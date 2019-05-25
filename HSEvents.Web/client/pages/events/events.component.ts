import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EventModel } from '../../models/event.models';
import { EventsService } from './events.service';
import { CalendarComponent } from './calendar/calendar.component';
import Abstractcomponent = require("../../utilities/abstract.component");
import AbstractComponent = Abstractcomponent.AbstractComponent;
import Authservice = require("../../services/auth.service");
import AuthService = Authservice.AuthService;
import Core = require("@angular/core");

@Component({
    moduleId: module.id.toString(),
	templateUrl: 'events.component.html',
	styleUrls: ['events.component.css'],
    providers: [EventsService]
})
export class EventsComponent extends AbstractComponent {

	showCalendar: boolean = true;
	event: EventModel = null;
	date: Date = null;

	@ViewChild('calendar')
	private calendar: CalendarComponent;

    constructor(protected eventsService: EventsService,
        protected authService: AuthService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef, authService);
    }

	onEditClick(id: number) {
		this.eventsService.get(id)
			.subscribe(event => {
					this.event = event;
					this.showCalendar = false;
				}
			);
	}

	onDeleteClick(id: number) {
		this.eventsService.delete(id).subscribe(x => {
			this.calendar.getMonth();
		});
	}

	onDayClick($event) {
		this.event = null;
		this.date = $event;
		this.showCalendar = false;
	}

	onEditFinished() {
		this.event = null;
		this.calendar.getMonth();
		this.showCalendar = true;
	}

}