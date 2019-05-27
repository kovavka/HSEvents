import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlsModule } from '../../controls/controls.module';
import { BsModalModule } from 'ng2-bs3-modal';
import Attendeemodalcomponent = require("./attendee-modal/attendee-modal.component");
import AttendeeModalComponent = Attendeemodalcomponent.AttendeeModalComponent;
import Attendeescomponent = require("./attendees.component");
import AttendeesComponent = Attendeescomponent.AttendeesComponent;

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ControlsModule,
        BsModalModule
    ],
    declarations: [
        AttendeesComponent,
        AttendeeModalComponent
    ]
})
export class AttendeesModule { }