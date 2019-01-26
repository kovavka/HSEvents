import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Country } from '../../../../../models/address.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'country-modal',
    templateUrl: 'country-modal.component.html',
    styleUrls: ['country-modal.css']
})
export class CountryModalComponent implements OnInit{

    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<Country> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование страны';

        return 'Добавление страны';
    }
    
    open(country: Country) {
        this.modal.open();
        this.name = country.name;
        this.id = country.id;
    }

    onApplyClick() {
        this.apply.emit(<Country>{
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