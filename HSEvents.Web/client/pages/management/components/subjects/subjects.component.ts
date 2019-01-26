﻿import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { first } from 'rxjs/operators';
import { SubjectService } from './subjects.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { SubjectModel } from '../../../../models/dictionaries.models';
import { SubjectModalComponent } from './subject-modal/subject-modal.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'subjects.component.html',
    styleUrls: ['subjects.component.css'],
    providers: [SubjectService]
})
export class SubjectsComponent extends SearchComponent implements OnInit {

    subjects: SubjectModel[] = [];

    constructor(private subjectService: SubjectService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
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
            .takeUntil(this.ngUnsubscribe)
            .subscribe(args => {
                this.getAll(args);
            });

        this.getAllSubject.next(this.searchArgs);
    }

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.subjectService.getAll()
            .finally(() => this.loading = false)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                this.subjects = data;
                console.log(this.subjects);
                this.refreshView();
            }, error => {

            });
    }

    onAddClick() {
        this.modal.open(new SubjectModel());
    }

    onModalApply(subject: SubjectModel) {
        console.log(subject);
    }
}