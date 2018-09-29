import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { EventExecution, EventDate, Address } from '../models/event.models';
import { Subject } from 'rxjs';

@Component({
	moduleId: module.id.toString(),
	selector: 'execution-editor',
	templateUrl: 'execution-editor.component.html',
	styleUrls: ['../events.component.css']
})
export class ExecutionEditorComponent {

	executionId: number;
	address: Address;
	dates: EventDate[];

	@ViewChild('modal')
	private modal: BsModalComponent;

	@Output()
	apply: EventEmitter<EventExecution> = new EventEmitter<EventExecution>();

	
	openModal() {
		this.openWindow().then(() => {
			
		});
	}

	add() {
		this.openModal()
	}

	edit(execution: EventExecution) {
		this.openModal()
	}
	
	hideModal() {
		this.modal.close();
	}

	private openWindow(): Promise<void> {
		return this.modal.open('lg');
	}
	
	onApply() {
		var execution = <EventExecution>{
			id: this.executionId,
			address: this.address,
			dates: this.dates
		};

		this.apply.emit(execution);
		this.modal.close();
	}
}