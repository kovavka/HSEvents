﻿import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

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

    @Input()
    set value(value: any) {
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
    }

    onInput($event) {
        this.filter($event.target.value);
        console.log();
    }
    
    filter(value: string) {
        var filtered = this.data.filter(x => this.contains(x, value));
        this.filteredItems = filtered;
    }

    contains(item: any, value: string): boolean {
        return this.displayFunc(item).toLowerCase().indexOf(value.toLowerCase()) != -1;
    }
    
}