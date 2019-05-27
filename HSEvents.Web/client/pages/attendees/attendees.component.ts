import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbstractComponent } from '../../utilities/abstract.component';
import { EmployeeService } from './employee.service';
import { Employee } from '../../models/user.models';
import Attendeemodalcomponent = require("./attendee-modal/attendee-modal.component");
import AttendeeModalComponent = Attendeemodalcomponent.AttendeeModalComponent;
import Attendeesservice = require("./attendees.service");
import AttendeeService = Attendeesservice.AttendeeService;
import Usermodels = require("../../models/user.models");
import AttendeeDto = Usermodels.AttendeeDto;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'attendees.component.html',
    providers: [AttendeeService ]

})
export class AttendeesComponent extends AbstractComponent implements OnInit {

    data: AttendeeDto[] = [];
    loading: boolean = false;

    constructor(protected router: Router,
        protected attendeeService: AttendeeService,
        protected authService: AuthService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef, authService);
    }

    ngOnInit() {
        this.getAll();
    }

    @ViewChild('modal')
    private modal: AttendeeModalComponent;


    getAll() {
        this.attendeeService.getAll()
            .subscribe(data => {
                this.data = data;
            });
    }

    onAddClick() {
        this.modal.open(new AttendeeDto());
    }

    onEditClick(attendee: AttendeeDto) {
        this.modal.open(attendee);
    }

    onDeleteClick(attendee: AttendeeDto) {
        this.loading = true;
        this.attendeeService.delete(attendee.id)
            .subscribe(x => {
                this.getAll();
            });
    }

    onModalApply(attendee: AttendeeDto) {
        if (attendee.id)
            this.update(attendee);
        else
            this.add(attendee);
    }

    private add(attendee: AttendeeDto) {
        this.attendeeService.add(attendee)
            .subscribe(x => {
                this.getAll();
            });
    }

    private update(attendee: AttendeeDto) {
        this.attendeeService.update(attendee)
            .subscribe(x => {
                this.getAll();
            });

    }
}
