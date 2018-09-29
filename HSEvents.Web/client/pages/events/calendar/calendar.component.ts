import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Month, RowEventArgs } from '../models/event.models';
import { EventsService } from '../events.service';
import { EventCardComponent } from './eventCard/event-card.component';

declare var jQuery;

@Component({
	moduleId: module.id.toString(),
	selector: 'calendar',
	templateUrl: 'calendar.component.html',
	styleUrls: ['calendar.component.css'],
	providers: [EventsService]
})
export class CalendarComponent implements AfterViewInit{
	currentMonth: Month;
	currentDate: Date;
	calendarHeight: number = 400;

	@ViewChild('panel')
	private panel: ElementRef;

	@ViewChild('eventCard')
	private eventCard: EventCardComponent; 

	@Output()
	editClick: EventEmitter<number> = new EventEmitter();

	@Output()
	deleteClick: EventEmitter<number> = new EventEmitter();

	@Output()
	dayClick: EventEmitter<Date> = new EventEmitter();

	constructor(private eventsService: EventsService,
		private changeDetector: ChangeDetectorRef) {
		this.currentDate = new Date(2018, new Date().getMonth(), 1);
		this.getMonth();
	}

	ngAfterViewInit(): void {
		this.recalculateHeight();
	}

	getMonth() {
		var year = this.currentDate.getFullYear();
		var month = this.currentDate.getMonth() + 1;

		return this.eventsService
			.getMonth(year, month)
			.subscribe(month => {
				this.currentMonth = month;
			});
	}

	recalculateHeight() {
		var windowHeight = jQuery(window).height();
		var panelHeight = this.panel.nativeElement.offsetHeight;
		
		this.calendarHeight = windowHeight - panelHeight - 70;
		this.changeDetector.detectChanges();
	}

	onResize($event) {
		this.recalculateHeight();
	}

	onPrevMonthClick() {

		this.currentDate.setMonth(this.currentDate.getMonth() - 1);
		this.getMonth();
	}

	onNextMonthClick() {
		this.currentDate.setMonth(this.currentDate.getMonth() + 1);
		this.getMonth();
	}

	get weekClass() {
		var count = this.currentMonth.weeks.length;
		var className = 'week-';

		switch (count) {
		case 4:
				className += '4';
			break;
		case 5:
				className += '5';
			break;
		case 6:
				className += '6';
			break;
		default:
				className = '';
			break;
		}
		return className;
	}

	onEventClick(args: RowEventArgs) {
		this.eventCard.toggle(args);
	}

	onEditClick(id: number) {
		this.editClick.emit(id);
	}

	onDeleteClick(id: number) {
		this.deleteClick.emit(id);
	}

	eventCardVisible:boolean;

	onDayClick(date: Date) {
		if (!this.eventCardVisible)
			this.dayClick.emit(new Date(date));
	}

	onEventCardVisibleChange(visible: false) {
		this.eventCardVisible = visible;
	}

}
