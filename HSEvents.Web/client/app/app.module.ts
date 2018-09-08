import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HomeModule } from '../pages/home/home.module';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { MenuComponent } from "../menu.component";
import { EventsModule } from "../pages/events/events.module";
registerLocaleData(localeRu);

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RouterModule,
		HomeModule,
		EventsModule
    ],
    declarations: [
		AppComponent,
	    MenuComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: LOCALE_ID, useValue: "ru-RU" }
    ]
})
export class AppModule {
}