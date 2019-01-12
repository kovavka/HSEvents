import { Component, OnInit } from '@angular/core';
import { DepartmentService } from './departments.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'departments.component.html',
    styleUrls: ['departments.component.css'],
    providers: [DepartmentService]
})
export class DepartmentsComponent extends SearchComponent implements OnInit {

    constructor(private departmentService: DepartmentService) {
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
        this.departmentService.getAll()
            .finally(() => this.loading = false)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });
    }
}