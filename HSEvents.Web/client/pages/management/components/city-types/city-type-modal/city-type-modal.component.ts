import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { CityType } from '../../../../../models/address.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'city-type-modal',
    templateUrl: 'city-type-modal.component.html',
})
export class CityTypeModalComponent implements OnInit{

    name: string;
    shortName: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<CityType> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование типа населенного пункта';

        return 'Добавление типа населенного пункта';
    }
    
    open(type: CityType) {
        this.modal.open();
        this.name = type.name;
        this.shortName = type.shortName;
        this.id = type.id;
    }

    onApplyClick() {
        this.apply.emit(<CityType>{
            name: this.name,
            shortName: this.shortName,
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