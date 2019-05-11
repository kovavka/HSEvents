import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlsModule } from '../../controls/controls.module';
import { AdminComponent } from './admin.component';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { BsModalModule } from 'ng2-bs3-modal';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ControlsModule,
        BsModalModule
    ],
    declarations: [
        AdminComponent,
        EmployeeModalComponent
    ]
})
export class AdminModule { }