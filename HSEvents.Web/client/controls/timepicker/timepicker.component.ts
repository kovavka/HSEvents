import { Component, Input, Output, ViewChild, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';

declare var jQuery: any;

@Component({
	selector: 'timepicker',
	template: `<input #input
						type="text"
						class="pointer"
						[value]="innerValue" 
						(keydown)="keyPressHandler($event)"
						(input)="value = $event.target.value">`
})
export class TimepickerComponent {
	private innerValue: string = '';
	private defaultValue: string = "00:00";
	
	@Output()
	valueChange: EventEmitter<string> = new EventEmitter();

	@Input()
	get value(): string {
		if (this.isCorrectTime(this.innerValue))
			return this.innerValue;
		return this.defaultValue;
	};
	
	set value(value: string) {
		console.log(value);
		console.log(this.isCorrectTime(value));
		if (this.isCorrectTime(value)) {
			this.innerValue = value;
			this.valueChange.emit(value);
		}
		else
			this.innerValue = this.defaultValue;

		this.input.nativeElement.value = this.innerValue;
	}

	constructor(private changeDetector: ChangeDetectorRef) {
	}

	isCorrectTime(str: string): boolean {
		var regex = new RegExp("^(([0-1]\\d)|(2[0-3])):(([0-5]\\d)|(60))$");
		return regex.test(str);
	}

	@ViewChild('input')
	private input: ElementRef;
	
	keyPressHandler(event: any) {
		console.log(event);
		console.log(this.innerValue);
		var key = event.key;
		var number = Number(key);
		var isNumber = !isNaN(number);
		

		if (key.length == 1 && !isNumber && !event.ctrlKey && key != ':')
			return false;

		var caretIndex = this.input.nativeElement.selectionStart;

		if (event.keyCode == 8) //Backspace
		{
			this.clear(caretIndex);
			return false;
		}
		
		if (!isNumber)
			return true;

		this.changeTime(caretIndex, key);
		return false;
	}

	private changeTime(caretIndex: number, digit: number) {
		if (caretIndex == 5) //конец строки
			return;
		if (caretIndex == 2) //перед ':'
			caretIndex = 3;
		
		if (caretIndex == 1 && this.value[0] == '2' && digit > 3) //если часы больше 23, заменяем на 00:**
			this.value = this.replaceAt(this.innerValue, caretIndex - 1, '00');

		else if (caretIndex == 0 && digit > 2) //если десятки часов больше 2, заменяем на 2*:**
			this.value = this.replaceAt(this.innerValue, caretIndex, '2');

		else if (caretIndex == 3 && digit > 5) //если десятки минут больше 5, заменяем на **:0*
			this.value = this.replaceAt(this.innerValue, caretIndex, '0');

		else
			this.value = this.replaceAt(this.innerValue, caretIndex, digit.toString());

		var nextIndex = caretIndex == 1 ? 3 : caretIndex + 1;
		this.input.nativeElement.selectionStart = nextIndex;
		this.input.nativeElement.selectionEnd = nextIndex;
	}

	private clear(caretIndex: number) {
		if (caretIndex == 0)
			return;

		if (caretIndex != 3) //после ':'
			this.value = this.replaceAt(this.innerValue, caretIndex - 1, '0');

		this.input.nativeElement.selectionStart = caretIndex - 1;
		this.input.nativeElement.selectionEnd = caretIndex - 1;
	}

	private replaceAt(str: string, index: number, chars: string) {
		return str.substr(0, index) + chars + str.substr(index + chars.length);

	}
}