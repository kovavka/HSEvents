import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { EventExecution, EventDate, Address } from '../models/event.models';
import { EventsService } from '../events.service';

@Component({
	moduleId: module.id.toString(),
	selector: 'execution-editor',
	templateUrl: 'execution-editor.component.html',
	styleUrls: ['../events.component.css'],
	providers: [EventsService]
})
export class ExecutionEditorComponent {

	executionId: number;
	address: Address;
	dates: EventDate[];

	addresses: Address[];

	@ViewChild('modal')
	private modal: BsModalComponent;

	@Output()
	apply: EventEmitter<EventExecution> = new EventEmitter<EventExecution>();

	constructor(private eventsService: EventsService) {
	}

	private openModal() {
		this.eventsService.getAddresses().subscribe(x => this.addresses = x);

		this.openWindow().then(() => {
			
		});
	}

	add() {
		this.clear();
		this.openModal();
	}

	edit(execution: EventExecution) {
		this.executionId = execution.id;
		this.address = execution.address;
		this.dates = execution.dates
			.map(x => <EventDate>{
				id: x.id,
				date: x.date,
				startTime: x.startTime,
				endTime: x.endTime
			});
		this.openModal();
	}
	
	hideModal() {
		this.modal.close();
	}

	private openWindow(): Promise<void> {
		return this.modal.open('lg');
	}

	private clear() {
		this.executionId = null;
		this.address = new Address();
		this.dates = [];
	}
	
	onApplyClick() {
		var execution = <EventExecution>{
			id: this.executionId,
			address: this.address,
			dates: this.dates
		};
		this.clear();
		this.apply.emit(execution);
		this.modal.close();
	}

	onCancelClick() {
		this.clear();
		this.hideModal();
	}

	onAddExecution() {
		this.dates.push(new EventDate());
	}

	onDelete(date: EventDate) {
		this.dates.splice(this.dates.indexOf(date), 1);
	}

	getDate(item: Date) {
		var date = new Date(item);
		return date;
	}

	onDateChange(value: string) {
		console.log(value);
	}

	onStartTimeChange(value: string) {
		console.log(value);
	}

	onEndTimeChange(value: string) {
		console.log(value);
	}

}