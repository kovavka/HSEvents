import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RegionService } from './regions.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'regions.component.html',
    styleUrls: ['regions.component.css'],
    providers: [RegionService]
})
export class RegionsComponent extends SearchComponent implements OnInit {

    constructor(private managementService: RegionService,
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
        this.managementService.getAll()
            .finally(() => this.loading = false)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });

    }
}