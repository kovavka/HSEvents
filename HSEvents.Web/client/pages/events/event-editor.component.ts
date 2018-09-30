import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventModel, EventExecution } from './models/event.models';
import { GetTypeList, ListItem } from '../../utilities/enum-helper';
import { EventsService } from './events.service';
import { ListRowItem } from '../../controls/list-row/list-row.component';
import { ExecutionEditorComponent } from './event-modals/execution-editor.component';

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
	
	@ViewChild('executionEditor')
	private executionEditor: ExecutionEditorComponent;

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

	get executions(): ListRowItem[] {
		if (!this.model.executions)
			return null;

		return this.model.executions.map(x => <ListRowItem>{
			value: x,
			caption: x.address.caption
		});
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

	onAddExecution() {
		this.executionEditor.add(this.date);
	}

	onEditExecution(execution: EventExecution) {
		this.executionEditor.edit(execution);
	}

	onDeleteExecution(execution: EventExecution) {
		this.model.executions.splice(this.model.executions.indexOf(execution), 1);
	}

	onExecutionApply(execution: EventExecution) {
		console.log(execution);
		this.model.executions.push(execution);
	}
}