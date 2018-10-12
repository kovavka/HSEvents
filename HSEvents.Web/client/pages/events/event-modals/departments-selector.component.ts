import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import {  } from '../models/event.models';
import { EventsService } from '../events.service';

@Component({
	moduleId: module.id.toString(),
    selector: 'departments-selector',
    templateUrl: 'departments-selector.component.html',
	styleUrls: ['../events.component.css'],
	providers: [EventsService]
})
export class DepartmentsSelectorComponent {

	@ViewChild('modal')
	private modal: BsModalComponent;

	@Output()
	apply = new EventEmitter();

	constructor(private eventsService: EventsService) {
	}

	private openModal() {
		
		this.openWindow().then(() => {
			
		});
	}
    
	hideModal() {
		this.modal.close();
	}

	private openWindow(): Promise<void> {
		return this.modal.open('lg');
	}

	onApplyClick() {
		this.apply.emit();
		this.modal.close();
	}

	onCancelClick() {
		this.clear();
		this.hideModal();
	}

    clear() {
        
    }
}