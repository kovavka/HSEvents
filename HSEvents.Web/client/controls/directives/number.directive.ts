import { forwardRef, Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export type NumberFormat = 'int' | 'decimal' | 'string';

const NUMBER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberDirective),
    multi: true
};

@Directive({
    selector: '[number]',
    providers: [NUMBER_VALUE_ACCESSOR]
})
export class NumberDirective implements ControlValueAccessor {
    private inputElement: HTMLInputElement;
    private lastCorrectValue: any = null;
    private onChange = (value: any) => { };

    @Input()
    format: NumberFormat = 'decimal';
    
    @Input()
    allowedSymbols: string[] = [];
    
    @Input()
    regex: string;

    @Output()
    valueChange: EventEmitter<any> = new EventEmitter();

    constructor(private elementRef: ElementRef) {
        this.inputElement = <HTMLInputElement>this.elementRef.nativeElement;
    }

    writeValue(value: any) {
        console.log(value);
        if (typeof value === "undefined" || value === "null")
            this.inputElement.value = null;
        else
            this.inputElement.value = value;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value: any) {
        this.testValue(value);
    }


    @HostListener('keydown', ['$event'])
    onKeydown(e: KeyboardEvent) {
        if (this.isCtrlKeys(e)) {
            return;
        }

        this.testKey(e);
    }
    
    private isCtrlKeys(e: KeyboardEvent) {
        // backspace, delete, tab, escape, enter
        if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
            // home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40) ||
            // Ctrl
            (e.ctrlKey === true || e.metaKey === true))
            return true;

        return false;
    }

    private testKey(e: KeyboardEvent) {
        switch (this.format) {
            case 'int':
                if (!new RegExp('\\d').test(e.key))
                    e.preventDefault();
                break;
            case 'decimal':
                if (!new RegExp('\\d|,|\\.').test(e.key))
                    e.preventDefault();
                break;
            case 'string':
                if (this.allowedSymbols.indexOf(e.key) == -1 && !new RegExp('\\d').test(e.key))
                    e.preventDefault();
                break;
        }
    }

    private testValue(value: any) {
        if (typeof value == "undefined" || value == null) {
            this.lastCorrectValue = null;
            return;
        }

        console.log(value);

        var regex: RegExp;
        switch (this.format) {
            case 'int':
                regex = new RegExp('^[\\d]*$');
                break;
            case 'decimal':
                regex = new RegExp('^[\\d]*([,|\\.][\\d]*)?$');
                break;
            case 'string':
                regex = this.regex ? new RegExp(this.regex) : new RegExp('^[\\d]*$');
                break;
        }
        if (regex.test(value))
            this.lastCorrectValue = value;
        else
            this.inputElement.value = this.lastCorrectValue;
    }
}