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

	editMode: boolean;
	index: number;
	executionId: number;
	address: Address;
	dates: EventDate[];

	addresses: Address[];

	@ViewChild('modal')
	private modal: BsModalComponent;

	@Output()
	apply: EventEmitter<EventExecutionArgs> = new EventEmitter<EventExecutionArgs>();

	constructor(private eventsService: EventsService) {
	}

	private openModal() {
		this.eventsService.getAddresses().subscribe(x => {
			this.addresses = x;
			if (!this.editMode)
				this.address = this.addresses[0];
		});

		this.openWindow().then(() => {
			
		});
	}

	add(date: Date) {
		this.clear();
		this.editMode = false;
		if (date) {
			var item = <EventDate>{
				date: date
			};
			this.dates.push(item);
		}
		this.openModal();
	}

	edit(execution: EventExecution, index: number) {
		this.editMode = true;
		this.index = index;
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
		var args = new EventExecutionArgs();
		args.execution = execution;
		if (this.editMode) {
			args.index = this.index;
			args.editMode = true;
		}
		console.log(args);
		this.apply.emit(args);
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

	onDateChange(date: Date, item: EventDate) {
		item.date = date;
	}
	
	onStartTimeChange(value: string, item: EventDate) {
		
		item.startTime = value;
	}

	onEndTimeChange(value: string, item: EventDate) {
		item.endTime = value;
	}

	onAddressChange(id: number) {
		this.address = this.addresses.filter(x => x.id == id)[0];
	}
}

export class EventExecutionArgs {
	execution: EventExecution;
	index: number;
	editMode: boolean;
}