import { Component, OnInit } from '@angular/core';
import { VolunteerService } from './volunteers.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'volunteers.component.html',
    styleUrls: ['volunteers.component.css'],
    providers: [VolunteerService]
})
export class VolunteersComponent extends SearchComponent implements OnInit{

    constructor(private volunteerService: VolunteerService) {
        super();
    }

    ngOnInit() {
        this.getAllSubject
            .takeUntil(this.ngUnsubscribe)
            .subscribe(args => {
                this.getAll(args);
            });

        this.getAllSubject.next(this.searchArgs);
    }

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.volunteerService.getAll()
            .finally(() => this.loading = false)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });

    }
}