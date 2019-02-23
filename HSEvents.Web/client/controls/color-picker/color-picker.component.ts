import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id.toString(),
    selector: 'color-picker',
    templateUrl: 'color-picker.component.html',
    styleUrls: ['color-picker.component.css'],
})
export class ColorPickerComponent {

    @Input()
    hex: string;

    @Output()
    colorChange: EventEmitter<string> = new EventEmitter();

}