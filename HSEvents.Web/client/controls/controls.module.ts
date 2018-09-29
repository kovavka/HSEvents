import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WindowResizeEventHandlerDirective } from './directives/window-resize-event-handler.directive';
import { DocumentClickEventHandlerDirective } from './directives/document-click-event-handler.directive';
import { TitleInput } from './title-input/title-input.component';
import { ListRow } from './list-row/list-row.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
	exports: [
		WindowResizeEventHandlerDirective,
		DocumentClickEventHandlerDirective,
		TitleInput,
		ListRow
       
    ],
	declarations: [
		WindowResizeEventHandlerDirective,
		DocumentClickEventHandlerDirective,
		TitleInput,
		ListRow
    ],
    providers: [
    ]
})
export class ControlsModule { }
