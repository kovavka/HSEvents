import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { ControlsModule } from '../../controls/controls.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ControlsModule
    ],
    declarations: [
        SignUpComponent
    ]
})
export class SignUpModule { }