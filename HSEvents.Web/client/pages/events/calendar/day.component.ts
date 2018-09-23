import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventDay }from '../models/calendar.models';

@Component({
    moduleId: module.id.toString(),
	selector: 'day',
	templateUrl: 'day.component.html',
    styleUrls: ['calendar.component.css']
})
export class DayComponent {

	@Input()
	item: EventDay;
	
	@Input()
	isMon: boolean = false;

	@Output()
	eventClick: EventEmitter<number> = new EventEmitter();

	onEventClick(id: number) {
		this.eventClick.emit(id);
	}
}