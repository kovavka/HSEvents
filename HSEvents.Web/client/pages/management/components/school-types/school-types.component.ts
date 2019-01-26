import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SchoolTypeService } from './school-types.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { SchoolType } from '../../../../models/school.models';
import { SchoolTypeModalComponent } from './school-type-modal/school-type-modal.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'school-types.component.html',
    styleUrls: ['school-types.component.css'],
    providers: [SchoolTypeService]
})
export class SchoolTypesComponent extends SearchComponent implements OnInit {

    types: SchoolType[] = [];

    constructor(private schoolTypeService: SchoolTypeService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }

    @ViewChild('modal')
    private modal: SchoolTypeModalComponent;

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
                this.types = data;
            }, error => {

            });

    }

    onAddClick() {
        this.modal.open(new SchoolType());
    }

    onEditClick(subject: SchoolType) {
        this.modal.open(subject);
    }

    onDeleteClick(type: SchoolType) {
        this.loading = true;
        this.schoolTypeService.delete(type.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(type: SchoolType) {
        if (type.id)
            this.update(type);
        else
            this.add(type);
    }

    private add(type: SchoolType) {
        this.schoolTypeService.add(type)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(type: SchoolType) {
        this.schoolTypeService.update(type)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });

    }
}