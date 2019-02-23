import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DepartmentService } from './departments.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { DepartmentModalComponent } from './department-modal/department-modal.component';
import { Department } from '../../../../models/dictionaries.models';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'departments.component.html',
    styleUrls: ['departments.component.css'],
    providers: [DepartmentService]
})
export class DepartmentsComponent extends SearchComponent implements OnInit {

    department: Department[];

    constructor(private departmentService: DepartmentService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }

    @ViewChild('modal')
    private modal: DepartmentModalComponent;

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
        this.departmentService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<Department[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.department = data;
            }, error => {

            });
    }

    onAddClick() {
        this.modal.open(new Department());
    }

    onEditClick(department: Department) {
        this.modal.open(department);
    }

    onDeleteClick(department: Department) {
        this.loading = true;
        this.departmentService.delete(department.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(department: Department) {
        if (department.id)
            this.update(department);
        else
            this.add(department);
    }

    private add(department: Department) {
        this.departmentService.add(department)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(department: Department) {
        this.departmentService.update(department)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });

    }
}