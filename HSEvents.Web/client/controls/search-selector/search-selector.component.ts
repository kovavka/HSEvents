import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

declare var jQuery;

@Component({
	moduleId: module.id.toString(),
    selector: 'search-selector',
    templateUrl: 'search-selector.component.html',
    styleUrls: ['search-selector.component.css'],
})
export class SearchSelectorComponent {

    innerText: string = null;

    @Input()
    set value(value: any) {
        console.log(this.data);
        if (this.displayFunc)
            this.innerText = this.displayFunc(value);
    }

	@Input()
    data: any[] = [];

	@Input()
    displayFunc: (any) => string;
    
    @Output()
    valueChange: EventEmitter<any> = new EventEmitter();

    constructor(private changeDetector: ChangeDetectorRef) {
    }


}
