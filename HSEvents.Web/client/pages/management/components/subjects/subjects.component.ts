import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { first } from 'rxjs/operators';
import { SubjectService } from './subjects.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'subjects.component.html',
    styleUrls: ['subjects.component.css'],
    providers: [SubjectService]
})
export class SubjectsComponent extends SearchComponent implements OnInit {

    constructor(private subjectService: SubjectService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router) {
        super();
    }
    
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
            .subscribe(data => {
                console.log(data);
            }, error => {

            });
    }
}