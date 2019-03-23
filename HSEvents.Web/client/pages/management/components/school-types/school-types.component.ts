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
    selected: SchoolType[] = [];

    constructor(private schoolTypeService: SchoolTypeService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }

    @ViewChild('modal')
    private modal: SchoolTypeModalComponent;

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
        this.schoolTypeService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<SchoolType[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.types = data;
                this.selected = [];
                this.refreshView();
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

    onDeleteSeveralClick() {
        this.loading = true;
        this.schoolTypeService.deleteSeveral(this.selected.map(x => x.id))
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

    onCheck($event: any, type: SchoolType) {
        if ($event.target.checked)
            this.selected.push(type);
        else
            this.selected.splice(this.selected.indexOf(type), 1);
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