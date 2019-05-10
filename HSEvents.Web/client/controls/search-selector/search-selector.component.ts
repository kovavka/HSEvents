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
    itemsVisible: boolean = false;
    filteredItems: any[] = null;
    displayFuncInner: (any) => string;
    private innerValue: any;

    @Input()
    set value(value: any) {
        this.innerValue = value;

        if (this.displayFuncInner && this.innerValue)
            this.innerText = this.displayFuncInner(this.innerValue);
        else
            this.innerText = null;
    }

	@Input()
    data: any[] = [];

    @Input()
    set displayFunc(value: (any) => string) {
        this.displayFuncInner = value;
        
        if (this.innerValue)
            this.innerText = this.displayFuncInner(this.innerValue);
    }
    
    @Output()
    valueChange: EventEmitter<any> = new EventEmitter();

    constructor(private changeDetector: ChangeDetectorRef) {
    }

    get items() {
        if (this.filteredItems)
            return this.filteredItems;

        return this.data;
    }

    onItemClick(item: any) {
        this.valueChange.emit(item);
    }

    onValueClick() {
        this.itemsVisible = true;
    }

    onDocumentClick($event: any) {
        this.itemsVisible = false;
        window.setTimeout(() => { this.changeDetector.detectChanges(); }, 10);
    }

    onInput($event) {
        this.filter($event.target.value);
    }
    
    filter(value: string) {
        var filtered = this.data.filter(x => this.contains(x, value));
        this.filteredItems = filtered;
    }

    contains(item: any, value: string): boolean {
        return this.displayFuncInner(item).toLowerCase().indexOf(value.toLowerCase()) != -1;
    }
    
}
