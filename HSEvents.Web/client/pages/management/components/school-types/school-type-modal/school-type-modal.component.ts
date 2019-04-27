import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { SchoolType } from '../../../../../models/school.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'school-type-modal',
    templateUrl: 'school-type-modal.component.html'
})
export class SchoolTypeModalComponent implements OnInit{

    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<SchoolType> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование типа образовательного учреждения';

        return 'Добавление типа образовательного учреждения';
    }
    
    open(type: SchoolType) {
        this.modal.open();
        this.name = type.name;
        this.id = type.id;
    }

    onApplyClick() {
        this.apply.emit(<SchoolType>{
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