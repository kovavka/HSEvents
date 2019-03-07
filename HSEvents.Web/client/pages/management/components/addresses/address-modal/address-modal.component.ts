import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Address } from '../../../../../models/address.models';


@Component({
    moduleId: module.id.toString(),
    selector: 'address-modal',
    templateUrl: 'address-modal.component.html',
    styleUrls: ['address-modal.css']
})
export class AddressModalComponent implements OnInit{

    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<Address> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование предмета';

        return 'Добавление предмета';
    }
    
    open(subject: Address) {
        this.modal.open();
        this.id = subject.id;
    }

    onApplyClick() {
        this.apply.emit(<Address>{
            id: this.id
        });
        this.modal.close();
    }

    onCancelClick() {
        this.clear();
        this.modal.close();
    }

    clear() {
        this.name = null;
        this.id = null;
    }
}