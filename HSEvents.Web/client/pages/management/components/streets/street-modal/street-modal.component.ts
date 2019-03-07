import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Street } from '../../../../../models/address.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'street-modal',
    templateUrl: 'street-modal.component.html',
    styleUrls: ['street-modal.css']
})
export class StreetModalComponent implements OnInit{

    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<Street> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование предмета';

        return 'Добавление предмета';
    }
    
    open(subject: Street) {
        this.modal.open();
        this.name = subject.name;
        this.id = subject.id;
    }

    onApplyClick() {
        this.apply.emit(<Street>{
            name: this.name,
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