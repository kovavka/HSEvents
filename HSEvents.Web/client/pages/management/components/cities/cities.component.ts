import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CityService } from './cities.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { City } from '../../../../models/address.models';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'cities.component.html',
    styleUrls: ['cities.component.css'],
    providers: [CityService]
})
export class CitiesComponent extends SearchComponent implements OnInit {

    constructor(private cityService: CityService,
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

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.cityService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<City[]>(this.ngUnsubscribe)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });
    }
}