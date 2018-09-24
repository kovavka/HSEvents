import { Directive, ElementRef, Input, Output, EventEmitter, NgZone } from '@angular/core';

@Directive({
	selector: '[documentClickEventHandler]'
})
export class DocumentClickEventHandlerDirective {
	private event: string = 'click';
	@Output('click') clickedEmitter = new EventEmitter();
	private _elementResizeHandler: any;
	constructor(private _ngZone: NgZone, private el: ElementRef) { }

	ngOnInit() {
		this._ngZone.runOutsideAngular(() => {

			this._elementResizeHandler = $event => { this.clickedEmitter.emit($event); }

			document.addEventListener(this.event, this._elementResizeHandler, true);
		});
	}

	ngOnDestory() {
		document.removeEventListener(this.event, this._elementResizeHandler);
	}
}