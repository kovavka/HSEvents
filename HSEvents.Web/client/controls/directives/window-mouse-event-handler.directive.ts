import { Directive, ElementRef, Output, EventEmitter, NgZone } from '@angular/core';

declare var window: any;

@Directive({
    selector: '[WindowMouseEventHandler]'
})
export class WindowMouseEventHandlerDirective {

    @Output('mousemove') mousemoveEmitter = new EventEmitter();
    @Output('mouseleave') mouseleaveEmitter = new EventEmitter();
    @Output('mouseup') mouseupEmitter = new EventEmitter();
    private _mousemoveHandler: any;
    private _mouseleaveHandler: any;
    private _mouseupHandler: any;
    constructor(private _ngZone: NgZone, private el: ElementRef) { }


    ngOnInit() {
        this._ngZone.runOutsideAngular(() => {

            this._mousemoveHandler = $event => { this.mousemoveEmitter.emit($event); }
            window.addEventListener('mousemove', this._mousemoveHandler, true);

            this._mouseleaveHandler = $event => { this.mouseleaveEmitter.emit($event); }
            window.addEventListener('mouseleave', this._mouseleaveHandler, true);

            this._mouseupHandler = $event => { this.mouseupEmitter.emit($event); }
            window.addEventListener('mouseup', this._mouseupHandler, true);
        });
    }

    ngOnDestory() {
        window.removeEventListener('mousemove', this._mousemoveHandler);
        window.removeEventListener('mouseleave', this._mouseleaveHandler);
        window.removeEventListener('mouseup', this._mouseupHandler);
    }
}