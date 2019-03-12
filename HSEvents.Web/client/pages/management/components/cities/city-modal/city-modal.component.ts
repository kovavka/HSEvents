﻿import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { City } from '../../../../../models/address.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'city-modal',
    templateUrl: 'city-modal.component.html',
    styleUrls: ['city-modal.css']
})
export class CityModalComponent implements OnInit{

    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<City> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование населенного пункта';

        return 'Добавление населенного пункта';
    }
    
    open(subject: City) {
        this.modal.open();
        this.name = subject.name;
        this.id = subject.id;
    }

    onApplyClick() {
        this.apply.emit(<City>{
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