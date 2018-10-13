import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventDay, EventRow, RowEventArgs }from '../models/event.models';

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
	currentDate: Date;

	@Input()
	week: number;

	@Input()
	dayOfWeek: number;

	@Input()
	weekCount: number;
	
	@Output()
    eventClick: EventEmitter<RowEventArgs> = new EventEmitter();

	@Output()
	eventDblclick: EventEmitter<number> = new EventEmitter();

	onEventClick(e: any, row: EventRow) {
		e.stopPropagation();
		var args = <RowEventArgs>{
			row: row,
			target: e.target,
			week: this.week,
			dayOfWeek: this.dayOfWeek,
			weekCount: this.weekCount,
		};
		this.eventClick.emit(args);
    }
    onEventDblclick(e: any, row: EventRow) {
        e.stopPropagation();
        this.eventDblclick.emit(row.id);
    }

	isToday(date: Date): boolean {
		var today = new Date();
		date = this.getDate(date);

		return date.getDate() == new Date().getDate() &&
			date.getMonth() == today.getMonth() &&
			date.getFullYear() == today.getFullYear();
	}

	isMinDate(date: Date): boolean {
		date = this.getDate(date);

		return date.getDate() < 10;
	}

	isCurrentMonth(item: EventDay): boolean {
		return this.getDate(item.date).getMonth() == this.currentDate.getMonth();
	}

	getDate(date: Date): Date {
		return new Date(date);
	}

	getDay(item: EventDay) {
		return this.getDate(item.date).getDate();
	}
}
