import { Component, Input, Output, EventEmitter, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Volunteer } from '../models/event.models';
import { EventsService } from '../events.service';

@Component({
	moduleId: module.id.toString(),
    selector: 'volunteers-selector',
    templateUrl: 'volunteers-selector.component.html',
	styleUrls: ['../events.component.css'],
	providers: [EventsService]
})
export class VolunteerSelectorComponent implements OnDestroy {

    volunteers: CheckedListItem[];
    find: CheckedListItem[];
    showSelected: boolean = false;
    private searchTextSubject = new Subject<string>();
    private searchTextSubscribtion: Subscription;

	@ViewChild('modal')
    private modal: BsModalComponent;

    @ViewChild('searchInput')
    private searchInput: ElementRef;

	@Output()
    apply: EventEmitter<Volunteer[]> = new EventEmitter();

    constructor(private eventsService: EventsService) {
        this.searchTextSubscribtion = this.searchTextSubject.pipe(debounceTime(400),
                distinctUntilChanged())
            .subscribe(text => {
                this.showSelected = false;
                this.search(text);
            });
    }

    ngOnDestroy() {
        this.searchTextSubscribtion.unsubscribe();
    }

    get items(): CheckedListItem[] {
        if (this.showSelected)
            return this.selected;

        if (this.find)
            return this.find;

        return this.volunteers;
    }

    get selected(): CheckedListItem[] {
        return this.volunteers.filter(x => x.checked);
    }

    get showCaption(): string {
        if (!this.showSelected)
            return 'Показать выбранные';

        if (this.find)
            return 'Показать результаты поиска';

        return 'Показать все результаты';
    }

    set searchText(value: string) {
        if (value)
            this.searchTextSubject.next(value);
        else
            this.find = null;
    }

    search(text: any) {
        this.find = this.volunteers.filter(x => this.containsPhrase(x.volunteer.fullName, text) ||
            this.containsPhrase(x.volunteer.group.name, text));
    }

    containsPhrase(text: string, phrase: string): boolean {
        return text.toLowerCase().includes(phrase.toLowerCase());
    }
    
    open(selectedVolunteers: Volunteer[]) {
        this.clear();
        this.eventsService.getVolunteers().subscribe(volunteers => {
            if (!selectedVolunteers)
                selectedVolunteers = [];

            this.volunteers = volunteers
                .map(x => <CheckedListItem>{
                    checked: Boolean(selectedVolunteers.find(xx => xx.id == x.id)),
                    volunteer: x
                });
        });
        this.openModal();
    }

    private openModal() {
		this.openWindow().then(() => { });
	}
    
	hideModal() {
		this.modal.close();
	}

	private openWindow(): Promise<void> {
		return this.modal.open();
	}

    onApplyClick() {
        this.apply.emit(this.selected.map(x => x.volunteer));
		this.modal.close();
	}

	onCancelClick() {
        this.clear();
		this.hideModal();
	}

    clear() {
        this.volunteers = [];
        this.find = null;
        this.clearSearchText();
        this.showSelected = false;
    }

    rowClick(item: CheckedListItem) {
        this.changeChecked(item);
    }

    onChecked(e: any, item: CheckedListItem) {
        e.stopPropagation();
        this.changeChecked(item);
    }

    changeChecked(item: CheckedListItem) {
        var volunteer = this.volunteers.find(x => x.volunteer.id == item.volunteer.id);
        volunteer.checked = !item.checked;
    }

    onShowClick() {
        this.showSelected = !this.showSelected;
    }

    clearSearchText() {
        this.searchInput.nativeElement.value = null;
        this.searchText = null;
    }
}

class CheckedListItem {
    volunteer: Volunteer;
    checked: boolean;
}