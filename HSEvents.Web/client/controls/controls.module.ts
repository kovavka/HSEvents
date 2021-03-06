﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalModule } from 'ng2-bs3-modal';
import { WindowResizeEventHandlerDirective } from './directives/window-resize-event-handler.directive';
import { DocumentClickEventHandlerDirective } from './directives/document-click-event-handler.directive';
import { TitleInputComponent } from './title-input/title-input.component';
import { EditableDatepickerComponent } from './editable-datapicker/editable-datapicker.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { WindowMouseEventHandlerDirective } from './directives/window-mouse-event-handler.directive';
import { NumberDirective } from './directives/number.directive';
import { SearchSelectorComponent } from './search-selector/search-selector.component';

@NgModule({
    imports: [
        CommonModule,
		FormsModule,
	    BsModalModule
    ],
	exports: [
        WindowResizeEventHandlerDirective,
        WindowMouseEventHandlerDirective,
        DocumentClickEventHandlerDirective,
	    NumberDirective,
		TitleInputComponent,
		EditableDatepickerComponent,
        TimepickerComponent,
        ColorPickerComponent,
	    SearchSelectorComponent
       
    ],
	declarations: [
        WindowResizeEventHandlerDirective,
        WindowMouseEventHandlerDirective,
        DocumentClickEventHandlerDirective,
	    NumberDirective,
		TitleInputComponent,
		EditableDatepickerComponent,
        TimepickerComponent,
        ColorPickerComponent,
	    SearchSelectorComponent
    ],
    providers: [
    ]
})
export class ControlsModule { }
