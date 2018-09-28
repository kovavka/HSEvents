import { EventsComponent } from './events.component';
import { EventEditorComponent } from './event-editor.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './calendar/day.component';
import { ControlsModule } from '../../controls/controls.module';
import { EventCardComponent } from './calendar/eventCard/event-card.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ControlsModule,
		FormsModule
	],
	declarations: [
		EventsComponent,
		CalendarComponent,
		DayComponent,
		EventCardComponent,
		EventEditorComponent
	],
	exports: [
		EventsComponent,
		CalendarComponent,
		DayComponent,
		EventCardComponent,
		EventEditorComponent
	]
})
export class EventsModule { }