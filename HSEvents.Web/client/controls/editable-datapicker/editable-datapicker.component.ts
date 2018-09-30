import { Component, Input, Output, ViewChild, EventEmitter, ElementRef, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
	selector: 'editable-datepicker',
	template: `<input type="text" class="form-control" style="cursor:pointer; height:30px"
            #input
            (keydown)="keyPressHandler($event)"
            (focusout)="onFocusOut($event)"
            (focus)="onFocus($event)">`
})
export class EditableDatepickerComponent implements OnInit {
	private innerValue: any = undefined;
	private initialized: boolean = false;
	public mayHideInput: boolean = true;
	private innerLastValidDate: Date = new Date();

	private pressedKey: PressedKey;
	private caretIndex: number;

	@Output() valueChange: EventEmitter<Date> = new EventEmitter();

	@Input()
	get value(): Date {
		return this.innerValue;
	};
	
	set value(v: Date) {
		if (((this.innerValue == undefined || v == undefined) && !(this.innerValue == undefined && v == undefined)) ||
			(v && v.toString() !== this.innerValue.toString())) {
			this.innerValue = v;
			if (!this.initialized)
				return;
			jQuery(this.input.nativeElement).datepicker('update', v);
			this.valueChange.emit(this.innerValue);
		}
	}

	get lastValidDate(): Date {
		return this.innerLastValidDate;
	};

	set lastValidDate(v: Date) {
		this.innerLastValidDate = new Date(v);
	}


	public EmitNativeDateUpdate(v: Date) {
		jQuery(this.input.nativeElement).datepicker('update', v);
	}

	@Input()
	required = false;
	@Input()
	defaultDate: Date = new Date();

	@ViewChild('input')
	private input: ElementRef;

	specifyDate() {
		this.value = this.onlyDate(this.defaultDate ? this.defaultDate : new Date());
		this.lastValidDate = this.value;
		this.startEditDate();
	}

	startEditDate() {
		setTimeout(() => { jQuery(this.input.nativeElement).datepicker('show'); }, 200);
	}

	onFocus($event: any) {
		this.mayHideInput = false;
	}

	onFocusOut($event: any) {
		this.mayHideInput = true;
	}

	onlyDate(date: Date): Date {
		let d = new Date(date);
		d.setHours(0, 0, 0, 0);
		return d;
	}

	isValid(date: string): boolean {
		return !isNaN(Date.parse(date));
	}

	getHolidaysAndWeekends(): Date[] {
		var dateArray = new Array();
		var startDate = new Date(2017, 0);
		var lastDate = new Date(2030, 0);
		while (startDate <= lastDate) {
			if (startDate.getDay() == 0 || startDate.getDay() == 6)
				dateArray.push(new Date(startDate));
			startDate.setDate(startDate.getDate() + 1);
		}
		return dateArray;
	}


	ngOnInit() {
		this.lastValidDate = new Date();
		let self = this;
		jQuery(this.input.nativeElement).datepicker({
			format: "dd.mm.yyyy",
			maxViewMode: 2,
			todayBtn: "linked",
			language: "ru",
			customHighlightDates: this.getHolidaysAndWeekends(),
			clearBtn: !self.required,
			forceParse: false,
			keyboardNavigation: false,
			autoclose: true,
			orientation: 'bottom',
			todayHighlight: false
		}).on("changeDate", (e: any) => {
			
			if (isNaN(e.date.getTime()))
				e.date = this.lastValidDate;
			else if (this.onlyDate(this.value).toString() === this.onlyDate(e.date).toString())
				return;

			this.lastValidDate = e.date;
			this.value = e.date;
			this.updateCaretIndex();
		}).on("clearDate", (e: any) => {
			this.value = undefined;
		});
		jQuery(this.input.nativeElement).datepicker("update", this.value);
		this.initialized = true;
	}
	
	keyPressHandler(event: any) {
		var key = event.key;
		var isNumber = Number(key);

		if (key.length == 1 && !isNumber && !event.ctrlKey)
			return false;

		if (!isNumber)
			return true;
		
		let actualCaret = this.input.nativeElement.selectionStart < 10 ? this.input.nativeElement.selectionStart : this.caretIndex;
		this.pressedKey = new PressedKey(key, actualCaret, jQuery(this.input.nativeElement).val());
		this.handleKey();
		return false;
	}
	
	handleKey() {
		if (this.pressedKey == undefined)
			return;

		const pressedKey = this.pressedKey;
		const caretIndex = pressedKey.caretIndex;

		let newVal = this.setCharAt(pressedKey.value, caretIndex, pressedKey.key);

		if ((caretIndex === 0) && (newVal[caretIndex] === "3") && (!this.isValid(newVal)))
			newVal = this.setCharAt(newVal, caretIndex + 1, "0");

		if ((caretIndex === 0 || caretIndex === 3) && (newVal[caretIndex] === "0") && (newVal[caretIndex + 1] === "0"))
			newVal = this.setCharAt(newVal, caretIndex + 1, "1");

		if (caretIndex === 3 && (pressedKey.key !== "0") && newVal[4] !== "0")
			newVal = this.setCharAt(newVal, caretIndex + 1, "0");

		jQuery(this.input.nativeElement).val(newVal);
		this.moveCaret();
		this.pressedKey = undefined;
		this.updateCaretIndex();
	}

	moveCaret() {
		let caretIndex = this.pressedKey.caretIndex + 1;

		if (caretIndex === 2)
			caretIndex = 3;
		if (caretIndex === 5)
			caretIndex = 6;
		if (caretIndex >= 10)
			caretIndex = 10;

		if (caretIndex != undefined && caretIndex != null && !isNaN(caretIndex))
			this.caretIndex = caretIndex;
	}

	updateCaretIndex() {
		if (this.caretIndex == undefined)
			return;

		let caretIndex = this.caretIndex;

		this.input.nativeElement.selectionStart = caretIndex;
		this.input.nativeElement.selectionEnd = caretIndex;
	}

	setCharAt(str: string, index: number, chr: string): string {
		if (index == undefined || index == null || index >= 10 || isNaN(index)) return str;
		var strRest = (index < str.length - 1) ? str.substr(index + 1) : "";
		return str.substr(0, index) + chr + strRest;
	}
}

class PressedKey {
	constructor(
		public key: string,
		public caretIndex: number,
		public value: string) { }
}