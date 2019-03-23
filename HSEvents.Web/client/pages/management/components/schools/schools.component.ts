import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SchoolService } from './schools.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { School } from '../../../../models/school.models';
import { SchoolModalComponent } from './school-modal/school-modal.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'schools.component.html',
    styleUrls: ['schools.component.css'],
    providers: [SchoolService]
})
export class SchoolsComponent extends SearchComponent implements OnInit {

    schools: School[] = [];
    selected: School[] = [];

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

    @ViewChild('modal')
    private modal: SchoolModalComponent;

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.schoolService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<School[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.schools = data;
                this.selected = [];
                this.refreshView();
            }, error => {

            });
    }

    onAddClick() {
        this.modal.open(new School());
    }

    onEditClick(school: School) {
        this.modal.open(school);
    }

    onDeleteClick(school: School) {
        this.loading = true;
        this.schoolService.delete(school.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onDeleteSeveralClick() {
        this.loading = true;
        this.schoolService.deleteSeveral(this.selected.map(x => x.id))
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(school: School) {
        if (school.id)
            this.update(school);
        else
            this.add(school);
    }

    onCheck($event: any, school: School) {
        if ($event.target.checked)
            this.selected.push(school);
        else
            this.selected.splice(this.selected.indexOf(school), 1);
    }

    private add(school: School) {
        this.schoolService.add(school)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(school: School) {
        this.schoolService.update(school)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }
}