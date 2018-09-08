﻿import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../menu.component';
import { HomeComponent } from '../pages/home/home.component';
import { EventsComponent } from "../pages/events/events.component";


const routes: Routes = [
    {
        path: '',
		component: MenuComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'events', component: EventsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }