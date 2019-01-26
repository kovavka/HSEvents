import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CountryService } from './countries.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'countries.component.html',
    styleUrls: ['countries.component.css'],
    providers: [CountryService]
})
export class CountriesComponent extends SearchComponent implements OnInit {

    constructor(private countryService: CountryService,
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
        this.countryService.getAll()
            .finally(() => this.loading = false)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });
    }
}