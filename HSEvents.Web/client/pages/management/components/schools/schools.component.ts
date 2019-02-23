import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SchoolService } from './schools.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { School } from '../../../../models/school.models';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'schools.component.html',
    styleUrls: ['schools.component.css'],
    providers: [SchoolService]
})
export class SchoolsComponent extends SearchComponent implements OnInit {

    constructor(private schoolService: SchoolService,
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
        this.schoolService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<School[]>(this.ngUnsubscribe)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });

    }
}