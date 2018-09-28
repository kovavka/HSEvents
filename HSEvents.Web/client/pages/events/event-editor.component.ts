﻿import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventModel } from './models/calendar.models';
import { GetTypeList, ListItem } from '../../utilities/enum-helper';
import { EventsService } from './events.service';

@Component({
	moduleId: module.id.toString(),
	selector: 'event-editor',
	templateUrl: 'event-editor.component.html',
	styleUrls: ['events.component.css'],
	providers: [EventsService]
})
export class EventEditorComponent implements OnInit{

	model: EventModel = new EventModel();
	types: ListItem[];


	constructor(private eventsService: EventsService) {
	}
	
	@Input()
	set event(value: EventModel) {
		if (!value) {
			this.model = new EventModel();
			this.model.type = 1;
		}
		else
			this.model = value;
	}
	
	@Input()
	date: Date;


	@Output()
	finished = new EventEmitter();

	ngOnInit() {
		this.types = GetTypeList.event();
	}
	
	set name(value: string) {
		this.model.name = value;
	}

	get name(): string {
		return this.model.name;
	}

	onSaveClick($event) {

		this.saveOrUpdate(this.model).subscribe(x => {
			console.log(x);
			this.finished.emit($event);
		});
	}

	saveOrUpdate(event: EventModel): Observable<any>  {
		if (event.id)
			return this.eventsService.update(event);

		return this.eventsService.add(event);
	}

	onCancelClick($event) {
		this.finished.emit($event);
	}
}