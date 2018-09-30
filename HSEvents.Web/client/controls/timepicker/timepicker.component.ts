import { Component, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

declare var jQuery: any;

@Component({
	selector: 'timepicker',
	template: `<input #input type="text" class="pointer" (keydown)="keyPressHandler($event)" (input)="value = $event.target.value" >`
})
export class TimepickerComponent {
	private innerValue: any = undefined;
	private lastCorrectValue: string = "00:00";
	
	@Output()
	valueChange: EventEmitter<string> = new EventEmitter();

	@Input()
	get value(): string {
		if (this.isCorrectTime(this.innerValue))
			return this.innerValue;
		return this.lastCorrectValue;
	};
	
	set value(value: string) {
		console.log(value);
		if (this.isCorrectTime(value))
			this.valueChange.emit(value);
	}

	isCorrectTime(str: string): boolean {
		var regex = new RegExp("^((\\d)|([0-1]\\d)|(2[0-3])):(([0-5]\\d)|(60))$");
		return regex.test(str);
	}

	@ViewChild('input')
	private input: ElementRef;
	
	keyPressHandler(event: any) {
		console.log(event);
		var key = event.key;
		var isNumber = Number(key);
		

		if (key.length == 1 && !isNumber && !event.ctrlKey && key != ':')
			return false;

		if (!isNumber)
			return true;

		//todo доделать умный ввод времени
		return true;
	}
}

class PressedKey {
	constructor(
		public key: string,
		public caretIndex: number,
		public value: string) { }
}