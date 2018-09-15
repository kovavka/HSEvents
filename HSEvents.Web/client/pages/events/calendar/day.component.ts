import { Component, Input } from '@angular/core';
import { EventItem }from '../models/calendar.models';

@Component({
    moduleId: module.id.toString(),
	selector: 'day',
	templateUrl: 'day.component.html',
    styleUrls: ['calendar.component.css']
})
export class DayComponent {

	@Input()
	events: EventItem[];

	@Input()
	day: number;
    
}