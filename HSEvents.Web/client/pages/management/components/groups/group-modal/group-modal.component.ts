﻿import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Group } from '../../../../../models/dictionaries.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'group-modal',
    templateUrl: 'group-modal.component.html'
})
export class GroupModalComponent implements OnInit{

    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<Group> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование группы';

        return 'Добавление группы';
    }
    
    open(group: Group) {
        this.modal.open();
        this.name = group.name;
        this.id = group.id;
    }

    onApplyClick() {
        this.apply.emit(<Group>{
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