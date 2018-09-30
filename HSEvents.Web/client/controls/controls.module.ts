import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalModule } from 'ng2-bs3-modal';
import { WindowResizeEventHandlerDirective } from './directives/window-resize-event-handler.directive';
import { DocumentClickEventHandlerDirective } from './directives/document-click-event-handler.directive';
import { TitleInputComponent } from './title-input/title-input.component';
import { ListRowComponent } from './list-row/list-row.component';
import { EditableDatepickerComponent } from './editable-datapicker/editable-datapicker.component';
import { TimepickerComponent } from './timepicker/timepicker.component';

@NgModule({
    imports: [
        CommonModule,
		FormsModule,
	    BsModalModule
    ],
	exports: [
		WindowResizeEventHandlerDirective,
		DocumentClickEventHandlerDirective,
		TitleInputComponent,
		ListRowComponent,
		EditableDatepickerComponent,
		TimepickerComponent
       
    ],
	declarations: [
		WindowResizeEventHandlerDirective,
		DocumentClickEventHandlerDirective,
		TitleInputComponent,
		ListRowComponent,
		EditableDatepickerComponent,
		TimepickerComponent
    ],
    providers: [
    ]
})
export class ControlsModule { }
