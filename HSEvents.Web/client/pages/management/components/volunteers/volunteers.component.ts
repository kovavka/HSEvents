import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { VolunteerService } from './volunteers.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { Volunteer } from '../../../../models/dictionaries.models';
import { VolunteerModalComponent } from './volunteer-modal/volunteer-modal.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'volunteers.component.html',
    styleUrls: ['volunteers.component.css'],
    providers: [VolunteerService]
})
export class VolunteersComponent extends SearchComponent implements OnInit{

    volunteers: Volunteer[];

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

    @ViewChild('modal')
    private modal: VolunteerModalComponent;

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.volunteerService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<Volunteer[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.volunteers = data;
            }, error => {

            });

    }

    onAddClick() {
        this.modal.open(new Volunteer());
    }

    onEditClick(volunteer: Volunteer) {
        this.modal.open(volunteer);
    }

    onDeleteClick(volunteer: Volunteer) {
        this.loading = true;
        this.volunteerService.delete(volunteer.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(volunteer: Volunteer) {
        if (volunteer.id)
            this.update(volunteer);
        else
            this.add(volunteer);
    }

    private add(volunteer: Volunteer) {
        this.volunteerService.add(volunteer)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(volunteer: Volunteer) {
        this.volunteerService.update(volunteer)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });

    }
}