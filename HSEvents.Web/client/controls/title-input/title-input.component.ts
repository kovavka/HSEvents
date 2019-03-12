import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
	moduleId: module.id.toString(),
	selector: 'title-input',
	templateUrl: 'title-input.component.html',
	styleUrls: ['title-input.component.css'],
})
export class TitleInputComponent {
	inputMinSize: number = 2;
	sourceValue = "";
	edit: boolean;
	timer: any;
	private innerValue: any = undefined;

	constructor(private changeDetector: ChangeDetectorRef) {
	}

	@Output()
	valueChange: EventEmitter<string> = new EventEmitter();

	@Input()
	defaultText: string;

	@Input()
	get value(): string {
		return this.innerValue;
	};

	@ViewChild('inputValue')
	private input: ElementRef;
	@ViewChild('inputTitle')
	private title: ElementRef;

	ngOnDestroy() {
		clearTimeout(this.timer);
	}

	onDocumentClick(e: any) {
		if (e.target !== this.input.nativeElement && e.target !== this.title.nativeElement) {
			this.applyChanges();
		}
	}

	get inputSize(): number {
		return Math.max(this.inputMinSize, (this.innerValue ? this.innerValue.length : 0));
	}


	set value(v: string) {
		this.innerValue = v;
		this.valueChange.emit(this.innerValue);
	}

	get displayValue(): string {
		if (this.valueIsDefault)
			return this.defaultText;
		return `${this.innerValue}`;
	}

	startEdit() {
		this.sourceValue = this.valueIsDefault ? this.defaultText : this.value;
		this.innerValue = this.valueIsDefault ? this.defaultText : this.value;

		this.edit = true;
		this.timer = window.setTimeout(() => {
			var element = this.input.nativeElement;
			(element as HTMLInputElement).select();
			element.focus();
		}, 200);

	}

	get valueIsDefault(): boolean {
		return this.value === this.defaultText || !this.value;
	}

	applyChanges() {
		if (!this.edit)
			return;

		this.endEdit();
		this.changeDetector.detectChanges();
    }

	dismissChanges() {
		this.value = this.sourceValue;
		this.endEdit();
	}

	clearValue() {
		this.value = "";
		this.applyChanges();
	}

	endEdit() {
		if (this.valueIsDefault)
			this.value = "";

		this.edit = false;
	}
}
