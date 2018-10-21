import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Purchase } from '../models/event.models';
import { EventsService } from '../events.service';

@Component({
	moduleId: module.id.toString(),
    selector: 'purchase-editor',
    templateUrl: 'purchase-editor.component.html',
	styleUrls: ['../events.component.css']
})
export class PurchaseEditorComponent {

	editMode: boolean;
	index: number;
	purchaseId: number;
	price: number;
	description: string;
	name: string;


	@ViewChild('modal')
	private modal: BsModalComponent;

	@Output()
    apply: EventEmitter<PurchaseArgs> = new EventEmitter();


	private openModal() {
		this.openWindow().then(() => {
			
		});
	}

	add() {
        this.clear();
	    this.price = 0;
		this.editMode = false;
		
		this.openModal();
	}

    edit(purchase: Purchase, index: number) {
		this.editMode = true;
		this.index = index;
        this.purchaseId = purchase.id;
        this.name = purchase.name;
        this.description = purchase.description;
        this.price = purchase.price;

		this.openModal();
	}
	
	hideModal() {
		this.modal.close();
	}

	private openWindow(): Promise<void> {
		return this.modal.open();
	}

	private clear() {
	    this.index = null;
        this.purchaseId = null;
        this.description = null;
        this.name = null;
        this.price = null;
	}
	
	onApplyClick() {
        var purchase = <Purchase>{
            id: this.purchaseId,
            price: this.price,
            name: this.name,
            description: this.description
		};
		this.clear();
        var args = new PurchaseArgs();
        args.purchase = purchase;
		if (this.editMode) {
			args.index = this.index;
			args.editMode = true;
		}
		this.apply.emit(args);
		this.modal.close();
	}

	onCancelClick() {
		this.clear();
		this.hideModal();
	}
}

export class PurchaseArgs {
    purchase: Purchase;
	index: number;
	editMode: boolean;
}