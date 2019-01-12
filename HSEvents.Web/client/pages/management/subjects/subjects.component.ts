import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { first } from 'rxjs/operators';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'subjects.component.html',
    styleUrls: ['subjects.component.css'],
    providers: [ManagementService]
})
export class SubjectsComponent implements OnInit  {

    constructor(private managementService: ManagementService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.url
            .pipe(first())
            .subscribe((segments: UrlSegment[]) => {
                if (segments.length==0)
                    this.router.navigate(['/management/subjects'], { preserveQueryParams: true });
            });
    }
}