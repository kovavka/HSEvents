import { Component, OnInit } from '@angular/core';
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

    constructor(private managementService: RegionService) {
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
        this.managementService.getAll()
            .finally(() => this.loading = false)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });

    }
}