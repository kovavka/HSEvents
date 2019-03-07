import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Volunteer } from '../../../../../models/dictionaries.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'volunteer-modal',
    templateUrl: 'volunteer-modal.component.html',
    styleUrls: ['volunteer-modal.css']
})
export class VolunteerModalComponent implements OnInit{

    fullName: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<Volunteer> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование волонтера';

        return 'Добавление волонтера';
    }
    
    open(subject: Volunteer) {
        this.modal.open();
        this.fullName = subject.fullName;
        this.id = subject.id;
    }

    onApplyClick() {
        this.apply.emit(<Volunteer>{
            fullName: this.fullName,
            id: this.id
        });
        this.modal.close();
    }

    onCancelClick() {
        this.clear();
        this.modal.close();
    }

    clear() {
        this.fullName = null;
        this.id = null;
    }
}