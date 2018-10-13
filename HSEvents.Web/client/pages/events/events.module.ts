import { EventsComponent } from './events.component';
import { EventEditorComponent } from './event-editor.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsModalModule } from 'ng2-bs3-modal';
import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './calendar/day.component';
import { ControlsModule } from '../../controls/controls.module';
import { EventCardComponent } from './calendar/event-card/event-card.component';
import { ExecutionEditorComponent } from './event-modals/execution-editor.component';
import { DepartmentsSelectorComponent } from './event-modals/departments-selector.component';
import { VolunteerSelectorComponent } from './event-modals/volunteers-selector.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ControlsModule,
		FormsModule,
		BsModalModule
	],
	declarations: [
		EventsComponent,
		CalendarComponent,
		DayComponent,
		EventCardComponent,
		EventEditorComponent,
        ExecutionEditorComponent,
        DepartmentsSelectorComponent,
	    VolunteerSelectorComponent
	],
	exports: [
		EventsComponent,
		CalendarComponent,
		DayComponent,
		EventCardComponent,
		EventEditorComponent,
        ExecutionEditorComponent,
        DepartmentsSelectorComponent,
	    VolunteerSelectorComponent
	]
})
export class EventsModule { }