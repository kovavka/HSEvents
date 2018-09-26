import { Component, Input } from '@angular/core';

@Component({
	moduleId: module.id.toString(),
	selector: 'event-editor',
	templateUrl: 'event-editor.component.html',
	styleUrls: ['events.component.css']
})
export class EventEditorComponent {

	@Input()
	event: Event;

	@Input()
	date: Date;


}