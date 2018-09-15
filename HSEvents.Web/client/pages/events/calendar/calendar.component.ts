import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Month, Week } from '../models/calendar.models';
import { EventsService } from '../events.service';

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
	calendarHeight: number = 400;

	@ViewChild('panel')
	private panel: ElementRef;

	constructor(private eventsService: EventsService) {
		this.getMonth(0, 0);
	}

	ngAfterViewInit(): void {
		this.recalculateHeight();
	}

	getMonth(year: number, month: number) {
		return this.eventsService
			.getMonth(year, month)
			.subscribe(month => {
				this.currentMonth = month;
			});
	}

	recalculateHeight() {
		var windowHeight = jQuery(window).height();
		var panelHeight = this.panel.nativeElement.offsetHeight;
		
		this.calendarHeight = windowHeight - panelHeight - 51 - 20;
	}

	onResize($event) {
		this.recalculateHeight();
	}
}
