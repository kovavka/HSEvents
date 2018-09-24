import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventDay, EventRow, RowEventArgs }from '../models/calendar.models';

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
	eventClick: EventEmitter<RowEventArgs> = new EventEmitter();

	onEventClick(e: any, row: EventRow) {
		var args = <RowEventArgs>{ row: row, target: e.target };
		this.eventClick.emit(args);
		
	}
}
