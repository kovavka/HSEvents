import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { School } from '../../../../../models/school.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'school-modal',
    templateUrl: 'school-modal.component.html',
    styleUrls: ['school-modal.css']
})
export class SchoolModalComponent implements OnInit{

    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<School> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование предмета';

        return 'Добавление предмета';
    }
    
    open(subject: School) {
        this.modal.open();
        this.name = subject.name;
        this.id = subject.id;
    }

    onApplyClick() {
        this.apply.emit(<School>{
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