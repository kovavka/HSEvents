import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Employee, User, UserType } from '../../../models/user.models';
import { ContactInfo } from '../../../models/other.models'
import Usermodels = require("../../../models/user.models");
import AttendeeDto = Usermodels.AttendeeDto;

@Component({
    moduleId: module.id.toString(),
    selector: 'attendee-modal',
    templateUrl: 'attendee-modal.component.html'
})
export class AttendeeModalComponent implements OnInit{

    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<AttendeeDto> = new EventEmitter();

    
    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование адреса';

        return 'Добавление адреса';
    }
    
    open(attendee: AttendeeDto) {
        this.initModal(attendee);
        this.modal.open();
    }

    initModal(attendee: AttendeeDto) {
        this.id = attendee.id;

        this.fullName = attendee.fullName;
        this.phoneNumber = attendee.phoneNumber;
        this.email = attendee.email;
    }
    
    onApplyClick() {
        this.apply.emit(<AttendeeDto> {
            id: this.id,
            fullName: this.fullName,
            phoneNumber: this.phoneNumber,
            email: this.email,
            schoolId: 1
        });
        this.modal.close();
    }

    onCancelClick() {
        this.clear();
        this.modal.close();
    }

    clear() {
        this.id = null;
        this.fullName = null;
        this.phoneNumber = null;
        this.email = null;
    }
}