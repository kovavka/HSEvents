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
import { VolunteersSelectorComponent } from './event-modals/volunteers-selector.component';
import { EmployeesSelectorComponent } from './event-modals/employees-selector.component';
import { PurchaseEditorComponent } from './event-modals/purchase-editor.component';
import { EventsListComponent } from './events-list/events-list.component';

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
        VolunteersSelectorComponent,
        EmployeesSelectorComponent,
        PurchaseEditorComponent,
	    EventsListComponent
	],
	exports: [
		EventsComponent,
		CalendarComponent,
		DayComponent,
		EventCardComponent,
		EventEditorComponent,
        ExecutionEditorComponent,
        DepartmentsSelectorComponent,
        VolunteersSelectorComponent,
        EmployeesSelectorComponent,
        PurchaseEditorComponent,
	    EventsListComponent
	]
})
export class EventsModule { }