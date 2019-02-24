import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RoundFunction } from '../../utilities/round-function';

@Component({
    moduleId: module.id.toString(),
    selector: 'color-picker',
    templateUrl: 'color-picker.component.html',
    styleUrls: ['color-picker.component.css'],
})
export class ColorPickerComponent implements AfterViewInit {

    private innerHex: string;

    currentSelector: Selector = 'none';
    hue: number;
    saturation: number;
    brightness : number;
    lightness : number;
    red: number;
    green: number;
    blue: number;
    sbBackground: string;
    hueSelectorPosition: number;
    hueSelectorDiff: number;
    hueSelectorMax: number;
    sbSelectorPositionX: number;
    sbSelectorDiffX: number;
    sbSelectorPositionY: number;
    sbSelectorDiffY: number;
    sbSelectorMax: number;

    @Input()
    set hex(value: string) {
        if (this.innerHex !== value) {
            this.innerHex = value;
            if (this.hueSelector.nativeElement.clientWidth)
                this.hueSelectorMax = this.hueSelector.nativeElement.clientWidth;
            if (this.sbSelector.nativeElement.clientWidth)
            this.sbSelectorMax = this.sbSelector.nativeElement.clientWidth - 5;
            this.updateFromHex();
        }
    }

    get hex(): string {
        return this.innerHex;
    }

    @Output()
    colorChange: EventEmitter<string> = new EventEmitter();

    constructor(protected changeDetectorRef: ChangeDetectorRef) {
    }

    @ViewChild('hueSelector')
    hueSelector: ElementRef;

    @ViewChild('sbSelector')
    sbSelector: ElementRef;

    ngAfterViewInit() {
        this.hueSelectorMax = 200;
        this.sbSelectorMax = 195;
        if (this.hex)
            this.updateFromHex();
    }

    get allowedHexSymbols(): string[] {
        return ['#', 'a', 'b', 'c', 'd', 'e', 'f'];
    }

    get hexRegex(): string {
        return '^#?[\\d|a-f|A-F]{0,6}$';
    }

    get rgbArray(): number[] {
        var red = this.red / 255 * 100;
        var green = this.green / 255 * 100;
        var blue = this.blue / 255 * 100;

        return [red, green, blue];
    }

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
    
    onSbSelectorMouseDown($event: any) {
        $event.stopPropagation();
        this.currentSelector = 'sb';
        this.sbSelectorDiffX = $event.clientX - $event.layerX + 5;
        this.sbSelectorDiffY = $event.clientY - $event.layerY + 5;
        this.sbSelectorMax = this.sbSelector.nativeElement.clientWidth - 5;
        this.sbSelectorPositionX = this.getPostion($event.clientX, this.sbSelectorDiffX, -5, this.sbSelectorMax);
        this.sbSelectorPositionY = this.getPostion($event.clientY, this.sbSelectorDiffY, -5, this.sbSelectorMax);
        this.refreshView();
    }

    onTheadMouseMove($event: any) {
        $event.stopPropagation();

        switch (this.currentSelector) {
            case 'hue':
                this.hueSelectorPosition = this.getPostion($event.clientX, this.hueSelectorDiff, 0, this.hueSelectorMax);
                this.refreshView();
                break;
            case 'sb':
                this.sbSelectorPositionX = this.getPostion($event.clientX, this.sbSelectorDiffX, -5, this.sbSelectorMax);
                this.sbSelectorPositionY = this.getPostion($event.clientY, this.sbSelectorDiffY, -5, this.sbSelectorMax);
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

    onHexChange(value: string) {
        this.hex = this.normalizeHex(value);
    }
    
    onRgbChange(value: string, type: RgbValue) {
        var normalizedValue = this.normalizeNumber(value, 255);
        switch (type) {
        case 'red':
            this.red = normalizedValue;
            break;
        case 'green':
            this.green = normalizedValue;
            break;
        case 'blue':
            this.blue = normalizedValue;
            break;
        }

        this.updateFromRgb();
    }

    onHslChange(value: string, type: HslValue) {
        switch (type) {
        case 'hue':
            var normalized = this.normalizeNumber(value, 360);
            this.hue = normalized == 360 ? 0 : normalized;
            break;
        case 'saturation':
            this.saturation = this.normalizeNumber(value, 255);
            break;
        case 'lightness':
            this.lightness = this.normalizeNumber(value, 255);
            break;
        }

        this.updateFromHsl();
    }

    recalculateColors() {
        //в html цветовая схема фактичести в HSB (HSV), надо переконвертировать его в HSL, RGB и HEX
        this.hue = this.getColorValue(this.hueSelectorPosition, this.hueSelectorMax, 359);
        this.saturation = this.getColorValue(this.sbSelectorPositionX + 5, this.sbSelectorMax + 5, 100);
        this.brightness = 100 - this.getColorValue(this.sbSelectorPositionY + 5, this.sbSelectorMax + 5, 100);

        var rgb = this.calculateRgb(this.hue, this.saturation, this.brightness);
        this.red = rgb.red;
        this.green = rgb.green;
        this.blue = rgb.blue;

        this.updateLightness();

        this.innerHex = this.getHex(rgb);
        this.sbBackground = this.getHex(this.calculateRgb(this.hue, 100, 100));
    }

    updateFromHex() {
        var rgb = this.getRgb(this.hex);
        this.red = rgb.red;
        this.green = rgb.green;
        this.blue = rgb.blue;

        this.updateLightness(); 
        this.updateHsb();

        this.changeDetectorRef.detectChanges();
    }

    updateFromRgb() {
        this.updateLightness(); 
        this.updateHsb();

        var rgb = <Rgb>{
            red: this.red,
            green: this.green,
            blue: this.blue,
        }
        this.innerHex = this.getHex(rgb);

        this.changeDetectorRef.detectChanges();
    }

    updateFromHsl() {
        var rgb = this.calculateRgbFromHsl();
        this.red = rgb.red;
        this.green = rgb.green;
        this.blue = rgb.blue;

        this.brightness = Math.max(...this.rgbArray);
        this.innerHex = this.getHex(rgb);
        this.updateHsbPositions();
        this.sbBackground = this.getHex(this.calculateRgb(this.hue, 100, 100));

        this.changeDetectorRef.detectChanges();
    }

    updateHsbPositions() {
        this.hueSelectorPosition = this.getPositionFromColor(this.hue, 359, this.hueSelectorMax);
        this.sbSelectorPositionX = this.getPositionFromColor(this.saturation, 100, this.sbSelectorMax + 5) - 5;
        this.sbSelectorPositionY = this.getPositionFromColor(100 - this.brightness, 100, this.sbSelectorMax + 5);
    }
    
    updateLightness() {
        var rgbPercent = this.rgbArray;
        var lightnessPart = (Math.max(...rgbPercent) + Math.min(...rgbPercent)) / 2;
        this.lightness = RoundFunction.toWhole(lightnessPart);
    }

    decToHex(value: number) {
        if (value > 15)
            return value.toString(16);

        return "0" + value.toString(16);
    }

    getRgb(hex: string): Rgb {
        return <Rgb> {
            red: parseInt(hex.slice(1, 3), 16),
            green: parseInt(hex.slice(3, 5), 16),
            blue: parseInt(hex.slice(5, 7), 16)
        }
    }

    getHex(rgb: Rgb) {
        var r = this.decToHex(rgb.red);
        var g = this.decToHex(rgb.green);
        var b = this.decToHex(rgb.blue);

        console.log(r)
        console.log(`#${r}${g}${b}`)
        return `#${r}${g}${b}`;
    }
    
    getColorValue(position: number, rangeCount: number, max: number): number {
        if (!rangeCount)
            return 0;

        var value = position / rangeCount * (max + 1);
        return value > max
                ? max
                : RoundFunction.round(value, 0);
    }

    getPositionFromColor(value: number, rangeCount: number, max: number): number {       
        var position = value / rangeCount * (max + 1);
        return position > max
            ? max
            : RoundFunction.round(position, 0);
    }

    getPostion(clientX: number, diff: number, min: number, max: number): number {
        var position = clientX - diff;

        if (position < min)
            return min;

        if (position > max)
            return max;
                
        return position;
    }
    
    normalizeHex(value: string): string {
        if (value == null && value.length == 0)
            return '#000000';

        var numbers = value[0] == '#'
            ? value.slice(1)
            : value;

        if (numbers.length > 3 && numbers.length < 6)
            return '#000000';

        if (numbers.length == 3)
            return `#${numbers[0]}${numbers[0]}${numbers[1]}${numbers[1]}${numbers[2]}${numbers[2]}`;

        return `#${numbers}`;
    }

    normalizeNumber(value: string, max: number): number {
        if (value == null)
            return 0;

        var d = Number(value);
        if (d > max)
            return max;

        return d;
    }
    
    //дикий алгоритм с википедии
    calculateRgbFromHsl(): Rgb {
        var h = this.hue / 360;
        var s = this.saturation / 100;
        var l = this.lightness / 100;

        var q = (l < 0.5)
            ? l * (1 + s)
            : l + s - (l * s);
        var p = 2 * l - q;
        var tr = h + 1 / 3;
        var tg = h;
        var tb = h - 1 / 3;

        var t = (tc) => {
            if (tc < 0)
                return tc + 1;
            if (tc > 1)
                return tc - 1;
            return tc;
        }
        var color = (tc) => {
            if (tc < 1 / 6)
                return p + ((q - p) * 6 * tc);
            if (tc >= 1 / 6 && tc < 1 / 2)
                return q;
            if (tc >= 1 / 2 && tc < 2 / 3)
                return p + ((q - p) * (2 / 3 - tc) * 6);
            return p;
        }

        var red = color(t(tr));
        var green = color(t(tg));
        var blue = color(t(tb));

        return <Rgb>{
            red: RoundFunction.toWhole(red * 255),
            green: RoundFunction.toWhole(green * 255),
            blue: RoundFunction.toWhole(blue * 255)
        };
    }

    //дикий алгоритм с википедии
    updateHsb() {
        var rgbPercent = this.rgbArray;
        var red = rgbPercent[0];
        var green = rgbPercent[1];
        var blue = rgbPercent[2];

        var min = Math.min(...rgbPercent);
        var max = Math.max(...rgbPercent);

        var hue: number;

        if (min == max)
            hue = 0;
        else if (max == red && green >= blue)
            hue = 60 * (green - blue) / (max - min) + 0;
        else if (max == red && green < blue)
            hue = 60 * (green - blue) / (max - min) + 360;
        else if (max == green)
            hue = 60 * (blue - red) / (max - min) + 120;
        else if (max == blue)
            hue = 60 * (red - green) / (max - min) + 240;

        hue = RoundFunction.toWhole(hue);
        this.hue = hue >= 360 ? 0 : hue;
        this.saturation = max == 0 ? 0 : RoundFunction.toWhole((1 - min / max) * 100);
        this.brightness = max;

        this.updateHsbPositions();
        this.sbBackground = this.getHex(this.calculateRgb(this.hue, 100, 100));
    }

    //дикий алгоритм с википедии
    calculateRgb(hue: number, saturation: number, brightness: number): Rgb {
        var h = Math.floor(hue / 60);
        var vMin = (100 - saturation) * brightness / 100;
        var a = (brightness - vMin) * (hue % 60) / 60;
        var vInc = vMin + a;
        var vDec = brightness - a;

        var red, green, blue: number; //в процентах

        switch (h) {
            case 0:
                red = brightness;
                green = vInc;
                blue = vMin;
                break;

            case 1:
                red = vDec;
                green = brightness;
                blue = vMin;
                break;

            case 2:
                red = vMin;
                green = brightness;
                blue = vInc;
                break;

            case 3:
                red = vMin;
                green = vDec;
                blue = brightness;
                break;

            case 4:
                red = vInc;
                green = vMin;
                blue = brightness;
                break;

            case 5:
                red = brightness;
                green = vMin;
                blue = vDec;
                break;
        }

        return <Rgb>{
            red: RoundFunction.toWhole(red * 255 / 100),
            green: RoundFunction.toWhole(green * 255 / 100),
            blue: RoundFunction.toWhole(blue * 255 / 100)
        };
    }
}

export type Selector = 'sb' | 'hue' | 'none';
export type RgbValue = 'red' | 'green' | 'blue';
export type HslValue = 'hue' | 'saturation' | 'lightness';

export class Rgb {
    red: number;
    green: number;
    blue: number;
}