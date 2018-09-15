import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WindowResizeEventHandlerDirective } from './directives/window-resize-event-handler.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
	exports: [
		WindowResizeEventHandlerDirective
       
    ],
	declarations: [
		WindowResizeEventHandlerDirective
    ],
    providers: [
    ]
})
export class ControlsModule { }
