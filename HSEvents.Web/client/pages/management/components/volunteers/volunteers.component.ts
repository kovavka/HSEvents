﻿import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VolunteerService } from './volunteers.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { Volunteer } from '../../../../models/dictionaries.models';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'volunteers.component.html',
    styleUrls: ['volunteers.component.css'],
    providers: [VolunteerService]
})
export class VolunteersComponent extends SearchComponent implements OnInit{

    constructor(private volunteerService: VolunteerService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }

    ngOnInit() {
        this.getAllSubject
            .takeUntil<SearchArgs>(this.ngUnsubscribe)
            .subscribe(args => {
                this.getAll(args);
            });

        this.getAllSubject.next(this.searchArgs);
    }

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.volunteerService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<Volunteer[]>(this.ngUnsubscribe)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });

    }
}