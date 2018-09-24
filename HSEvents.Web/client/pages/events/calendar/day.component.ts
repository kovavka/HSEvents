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
	week: number;

	@Input()
	dayOfWeek: number;

	@Input()
	weekCount: number;
	
	@Output()
	eventClick: EventEmitter<RowEventArgs> = new EventEmitter();

	onEventClick(e: any, row: EventRow) {
		var args = <RowEventArgs>{
			row: row,
			target: e.target,
			week: this.week,
			dayOfWeek: this.dayOfWeek,
			weekCount: this.weekCount,
		};
		this.eventClick.emit(args);
	}

	isToday(day: number): boolean {
		return day == new Date().getDate();
	}
}
