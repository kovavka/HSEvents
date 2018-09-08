﻿
import { EventsComponent } from './events.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
	    EventsComponent
    ]
})
export class EventsModule { }