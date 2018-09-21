
import { EventsComponent } from './events.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './calendar/day.component';
import { ControlsModule } from '../../controls/controls.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ControlsModule
	],
	declarations: [
		EventsComponent,
		CalendarComponent,
		DayComponent
	],
	exports: [
		EventsComponent,
		CalendarComponent,
		DayComponent
	]
})
export class EventsModule { }