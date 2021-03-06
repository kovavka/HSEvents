﻿import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Department } from '../../../../../models/dictionaries.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'department-modal',
    templateUrl: 'department-modal.component.html'
})
export class DepartmentModalComponent implements OnInit {

    name: string;
    color: string;
    id: number;

    @ViewChild('modal')
    private modal: BsModalComponent;

    @Output()
    apply: EventEmitter<Department> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование подразделения';

        return 'Добавление подразделения';
    }

    open(group: Department) {
        this.modal.open();
        this.name = group.name;
        this.color = group.color;
        this.id = group.id;
    }

    onColorChange(hex: string) {
        this.color = hex;
    }

    onApplyClick() {
        this.apply.emit(<Department>{
            name: this.name,
            color: this.color,
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