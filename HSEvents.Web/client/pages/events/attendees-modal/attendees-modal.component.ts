import { Component, Input, Output, EventEmitter, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Employee } from '../../../models/user.models';
import { EventsService } from '../events.service';
import Usermodels = require("../../../models/user.models");
import AttendeeDto = Usermodels.AttendeeDto;
import Attendeesservice = require("../../attendees/attendees.service");
import AttendeeService = Attendeesservice.AttendeeService;

@Component({
    moduleId: module.id.toString(),
    selector: 'attendees-selector',
    templateUrl: 'attendees-modal.component.html',
    styleUrls: ['../events.component.css'],
    providers: [EventsService, AttendeeService]
})
export class AttendeesSelectorComponent implements OnDestroy {

    eventId: number;
    attendees: CheckedListItem[];
    find: CheckedListItem[];
    showSelected: boolean = false;
    private searchTextSubject = new Subject<string>();
    private searchTextSubscribtion: Subscription;

    fromDb: number[];

    toAdd: AttendeeDto[];
    toRemove: AttendeeDto[];

    @Input()
    title: string;

    @ViewChild('modal')
    private modal: BsModalComponent;

    @ViewChild('searchInput')
    private searchInput: ElementRef;
    
    constructor(private attendeeService: AttendeeService, private  eventsService: EventsService) {
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

        return this.attendees;
    }

    get selected(): CheckedListItem[] {
        return this.attendees.filter(x => x.checked);
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
        this.find = this.attendees.filter(x => this.containsPhrase(x.attendee.fullName, text) ||
            this.containsPhrase(x.attendee.email, text));
    }

    containsPhrase(text: string, phrase: string): boolean {
        return text.toLowerCase().includes(phrase.toLowerCase());
    }

    open(eventId: number) {
        this.clear();
        this.eventId = eventId;
        this.attendeeService.getAllByEvent(eventId)
            .subscribe(selected => {
                this.fromDb = selected.map(x => x.id);

                this.attendeeService.getAll().subscribe(attendees => {
                    this.attendees = attendees
                        .map(x => <CheckedListItem>{
                            checked: Boolean(selected.find(xx => xx.id == x.id)),
                            attendee: x
                        });
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
        return this.modal.open('lg');
    }

    onApplyClick() {
        //todo отвратительное решение

        for (var item of this.attendees) {
            var attendeeId = item.attendee.id;
            if (this.fromDb.indexOf(attendeeId) == -1) {
                if (item.checked) {
                    this.eventsService.addRegistration(this.eventId, attendeeId).subscribe(x => { });
                }
            } else if (!item.checked) {
                this.eventsService.deleteRegistration(this.eventId, attendeeId).subscribe(x => { });
            }
        }

        this.modal.close();
    }

    onCancelClick() {
        this.clear();
        this.hideModal();
    }

    clear() {
        this.attendees = [];
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
        var attendee = this.attendees.find(x => x.attendee.id == item.attendee.id);
        attendee.checked = !item.checked;
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
    attendee: AttendeeDto;
    checked: boolean;
}