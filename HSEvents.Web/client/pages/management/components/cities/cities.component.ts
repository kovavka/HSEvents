import { Component, OnInit } from '@angular/core';
import { CityService } from './cities.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'cities.component.html',
    styleUrls: ['cities.component.css'],
    providers: [CityService]
})
export class CitiesComponent extends SearchComponent implements OnInit {

    constructor(private cityService: CityService) {
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
        this.cityService.getAll()
            .finally(() => this.loading = false)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });
    }
}