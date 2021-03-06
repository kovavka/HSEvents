﻿import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { first } from 'rxjs/operators';
import { SubjectService } from './subjects.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { SubjectModel } from '../../../../models/dictionaries.models';
import { SubjectModalComponent } from './subject-modal/subject-modal.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'subjects.component.html',
    styleUrls: ['subjects.component.css'],
    providers: [SubjectService]
})
export class SubjectsComponent extends SearchComponent implements OnInit {

    subjects: SubjectModel[] = [];
    selected: SubjectModel[] = [];

    constructor(private subjectService: SubjectService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);
    }

    @ViewChild('modal')
    private modal: SubjectModalComponent;
    
    ngOnInit() {
        this.activatedRoute.url
            .pipe(first())
            .subscribe((segments: UrlSegment[]) => {
                if (segments.length == 0)
                    this.router.navigate(['/management/subjects'], { preserveQueryParams: true });
            });

        this.getAllSubject
            .takeUntil<SearchArgs>(this.ngUnsubscribe)
            .subscribe(args => {
                this.getAll(args);
            });

        this.getAllSubject.next(this.searchArgs);
    }

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.subjectService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<SubjectModel[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.subjects = data;
                this.selected = [];
                this.refreshView();
            }, error => {

            });
    }
    
    onAddClick() {
        this.modal.open(new SubjectModel());
    }

    onEditClick(subject: SubjectModel) {
        this.modal.open(subject);
    }

    onDeleteClick(subject: SubjectModel) {
        this.loading = true;
        this.subjectService.delete(subject.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onDeleteSeveralClick() {
        this.loading = true;
        this.subjectService.deleteSeveral(this.selected.map(x => x.id))
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(subject: SubjectModel) {
        if (subject.id)
            this.update(subject);
        else
            this.add(subject);
    }

    onCheck($event: any, subject: SubjectModel) {
        if ($event.target.checked)
            this.selected.push(subject);
        else
            this.selected.splice(this.selected.indexOf(subject), 1);
    }

    private add(subject: SubjectModel) {
        this.subjectService.add(subject)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(subject: SubjectModel) {
        this.subjectService.update(subject)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });

    }
}