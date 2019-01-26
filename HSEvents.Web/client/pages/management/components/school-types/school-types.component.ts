import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SchoolTypeService } from './school-types.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'school-types.component.html',
    styleUrls: ['school-types.component.css'],
    providers: [SchoolTypeService]
})
export class SchoolTypesComponent extends SearchComponent implements OnInit {

    constructor(private schoolTypeService: SchoolTypeService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
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
        this.schoolTypeService.getAll()
            .finally(() => this.loading = false)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });

    }
}