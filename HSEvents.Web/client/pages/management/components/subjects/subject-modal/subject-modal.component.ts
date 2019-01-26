import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { SubjectModel } from '../../../../../models/dictionaries.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'subject-modal',
    templateUrl: 'subject-modal.component.html',
    styleUrls: ['subject-modal.css']
})
export class SubjectModalComponent implements OnInit{

    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<SubjectModel> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование предмета';

        return 'Добавление предмета';
    }
    
    open(subject: SubjectModel) {
        this.modal.open();
        this.name = subject.name;
        this.id = subject.id;
    }

    onApplyClick() {
        this.apply.emit(<SubjectModel>{
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