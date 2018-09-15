import { Directive, ElementRef, Input, Output, EventEmitter, NgZone } from '@angular/core';

@Directive({
	selector: '[windowResizeEventHandler]'
})
export class WindowResizeEventHandlerDirective {
	private event: string = 'resize';
	@Output('resize') clickedEmitter = new EventEmitter();
	private _elementResizeHandler: any;
	constructor(private _ngZone: NgZone, private el: ElementRef) { }

	ngOnInit() {
		this._ngZone.runOutsideAngular(() => {

			this._elementResizeHandler = $event => { this.clickedEmitter.emit($event); }

			window.addEventListener(this.event, this._elementResizeHandler, true);
		});
	}

	ngOnDestory() {
		window.removeEventListener(this.event, this._elementResizeHandler);
	}
}