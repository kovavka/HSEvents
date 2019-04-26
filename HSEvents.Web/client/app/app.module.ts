import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalModule } from 'ng2-bs3-modal';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

import { AppRoutingModule } from '../app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from '../pages/home/home.module';
import { TopMenuComponent } from "../menus/top-menu.component";
import { EventsModule } from "../pages/events/events.module";
import { HseHttpClient } from '../services/hse-httpclient';
import { ControlsModule } from '../controls/controls.module';
import { ManagementModule } from '../pages/management/management.module';
import { LoginModule } from '../pages/login/login.module';
import { AuthService } from '../services/auth.service';
import { StatisticModule } from '../pages/statistic/statistic.module';

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
	    BsModalModule,
		HomeModule,
        EventsModule,
        ManagementModule,
        ControlsModule,
        LoginModule,
        StatisticModule
    ],
    declarations: [
		AppComponent,
	    TopMenuComponent
    ],
    bootstrap: [AppComponent],
    providers: [
		{ provide: LOCALE_ID, useValue: "ru-RU" },
        HseHttpClient,
        AuthService

    ]
})
export class AppModule {
}