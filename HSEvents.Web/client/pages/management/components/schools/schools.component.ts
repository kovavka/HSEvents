import { Component, OnInit } from '@angular/core';
import { SchoolService } from './schools.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'schools.component.html',
    styleUrls: ['schools.component.css'],
    providers: [SchoolService]
})
export class SchoolsComponent extends SearchComponent implements OnInit {

    constructor(private schoolService: SchoolService) {
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
        this.schoolService.getAll()
            .finally(() => this.loading = false)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });

    }
}