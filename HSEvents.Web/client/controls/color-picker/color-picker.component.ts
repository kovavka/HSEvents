import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { RoundFunction } from '../../utilities/round-function';

@Component({
    moduleId: module.id.toString(),
    selector: 'color-picker',
    templateUrl: 'color-picker.component.html',
    styleUrls: ['color-picker.component.css'],
})
export class ColorPickerComponent {

    currentSelector: Selector = 'none';
    hue: number;
    saturation: number;
    brightness : number;
    lightness : number;
    red: number;
    green: number;
    blue: number;
    hueSelectorPosition: number;
    hueSelectorDiff: number;
    hueSelectorMax: number;
    slSelectorPositionX: number;
    slSelectorDiffX: number;
    slSelectorPositionY: number;
    slSelectorDiffY: number;
    slSelectorMax: number;

    @Input()
    hex: string;

    @Output()
    colorChange: EventEmitter<string> = new EventEmitter();

    constructor(protected changeDetectorRef: ChangeDetectorRef) {
    }

    @ViewChild('hueSelector')
    hueSelector: ElementRef;

    @ViewChild('slSelector')
    slSelector: ElementRef;

    refreshView() {
        this.recalculateColors();
        this.changeDetectorRef.detectChanges();
    }
    
    onHueSelectorMouseDown($event: any) {
        $event.stopPropagation();
        this.currentSelector = 'hue';
        this.hueSelectorDiff = $event.clientX - $event.layerX;
        this.hueSelectorMax = this.hueSelector.nativeElement.clientWidth;
        this.hueSelectorPosition = this.getPostion($event.clientX, this.hueSelectorDiff, 0, this.hueSelectorMax);
        this.refreshView();
    }
    
    onSlSelectorMouseDown($event: any) {
        $event.stopPropagation();
        this.currentSelector = 'sl';
        this.slSelectorDiffX = $event.clientX - $event.layerX + 5;
        this.slSelectorDiffY = $event.clientY - $event.layerY + 5;
        this.slSelectorMax = this.hueSelector.nativeElement.clientWidth - 5;
        this.slSelectorPositionX = this.getPostion($event.clientX, this.slSelectorDiffX, -5, this.slSelectorMax);
        this.slSelectorPositionY = this.getPostion($event.clientY, this.slSelectorDiffY, -5, this.slSelectorMax);
        this.refreshView();
    }

    onTheadMouseMove($event: any) {
        $event.stopPropagation();

        switch (this.currentSelector) {
            case 'hue':
                this.hueSelectorPosition = this.getPostion($event.clientX, this.hueSelectorDiff, 0, this.hueSelectorMax);
                this.refreshView();
                break;
            case 'sl':
                this.slSelectorPositionX = this.getPostion($event.clientX, this.slSelectorDiffX, -5, this.slSelectorMax);
                this.slSelectorPositionY = this.getPostion($event.clientY, this.slSelectorDiffY, -5, this.slSelectorMax);
                this.refreshView();
                break;
            case 'none':
                break;
        }
    }
    
    onTheadMouseLeave($event: any) {
        $event.stopPropagation();
    }

    onTheadMouseUp($event: any) {
        $event.stopPropagation();
        this.currentSelector = 'none';
    }

    recalculateColors() {
        //в html цветовая схема фактичести в HSB (HSV), надо переконвертировать его в HSL, RGB и HEX
        this.hue = this.getColorValue(this.hueSelectorPosition, this.hueSelectorMax, 359);
        this.saturation = this.getColorValue(this.slSelectorDiffX, this.slSelectorMax, 100);
        this.brightness = this.getColorValue(this.slSelectorDiffY, this.slSelectorMax, 100);

        this.calculateRgb();
                     
    }

    //дикий алгоритм с какого-то форума, каким-то образом работает
    calculateRgb() {
        var ii = Math.floor(this.hue / 60);
        var fr = this.hue - ii;

        var c1 = RoundFunction.toWhole((this.brightness * (255 - this.saturation)) / 255);
        var c2 = RoundFunction.toWhole((this.brightness * (255 - this.saturation * fr)) / 255);
        var c3 = RoundFunction.toWhole((this.brightness * (255 - this.saturation * (1.0 - fr))) / 255);

        switch (ii) {
            case 0:
                this.red = this.brightness;
                this.green = c3;
                this.blue = c1;
                break;

            case 1:
                this.red = c2;
                this.green = this.brightness;
                this.blue = c1;
                break;

            case 2:
                this.red = c1;
                this.green = this.brightness;
                this.blue = c3;
                break;

            case 3:
                this.red = c1;
                this.green = c2;
                this.blue = this.brightness;
                break;

            case 4:
                this.red = c3;
                this.green = c1;
                this.blue = this.brightness;
                break;

            case 5:
                this.red = this.brightness;
                this.green = c1;
                this.blue = c2;
                break;

        }

    }
    getColorValue(position: number, rangeCount: number, max: number): number {
        if (!this.hueSelectorMax)
            return 0;

        var value = position / rangeCount * (max + 1);
        return value > max
                ? max
                : RoundFunction.round(value, 0);
    }

    getPostion(clientX: number, diff: number, min: number, max: number): number {
        var position = clientX - diff;

        if (position < min)
            return min;

        if (position > max)
            return max;
                
        return position;
    }
}

export type Selector = 'sl' | 'hue' | 'none';