import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsModalModule } from 'ng2-bs3-modal';
import { ControlsModule } from '../../controls/controls.module';
import { ManagementComponent } from './management.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ControlsModule,
		FormsModule,
		BsModalModule
	],
    declarations: [
        ManagementComponent
	],
    exports: [
        ManagementComponent
	]
})
export class ManagementModule { }