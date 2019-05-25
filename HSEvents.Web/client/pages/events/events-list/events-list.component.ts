import { Component, OnInit, ChangeDetectorRef, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import Abstractcomponent = require("../../../utilities/abstract.component");
import AbstractComponent = Abstractcomponent.AbstractComponent;
import Authservice = require("../../../services/auth.service");
import AuthService = Authservice.AuthService;
import Eventsservice = require("../events.service");
import EventsService = Eventsservice.EventsService;
import Eventmodels = require("../../../models/event.models");
import EventModel = Eventmodels.EventModel;
import Enumhelper = require("../../../utilities/enum-helper");
import GetTypeDescription = Enumhelper.GetTypeDescription;

@Component({
	moduleId: module.id.toString(),
	selector: 'events-list',
    templateUrl: 'events-list.component.html',
    styleUrls: ['events-list.component.css'],
    providers: [EventsService]
})
export class EventsListComponent extends AbstractComponent implements OnInit {

    private _searchText = '';
    private attendeeId: number;
    events: EventModel[];

    keyChanged: Subject<string> = new Subject<string>();

    constructor(protected eventService: EventsService,
        protected authService: AuthService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef, authService);
    }

    ngOnInit(): void {
        this.attendeeId = this.authService.attendee.id;

        this.keyChanged
            .debounceTime(200)
            .subscribe(x => this.getEvents(x));

        this.keyChanged.next('');
    }

    getEvents(key: string) {
        this.eventService.getByArgs(key, this.attendeeId).subscribe(data => this.events = data);
    }
    
    get searchText(): string {
        return this._searchText;
    }

    set searchText(value: string) {
        this._searchText = value;
        this.keyChanged.next(value);
    }


    getType(event: EventModel): string {
        return GetTypeDescription.event(event.type);
    }

    onAddRegistration(eventId: number) {
        this.eventService.addRegistration(eventId, this.attendeeId)
            .subscribe(x => this.getEvents(this.searchText));
    }

    onCancelRegistration(eventId: number) {
        this.eventService.deleteRegistration(eventId, this.attendeeId)
            .subscribe(x => this.getEvents(this.searchText));
    }
}
