import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CityTypeService } from './city-types.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'city-types.component.html',
    styleUrls: ['city-types.component.css'],
    providers: [CityTypeService]
})
export class CityTypesComponent extends SearchComponent implements OnInit {

    constructor(private cityTypeService: CityTypeService,
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
        this.cityTypeService.getAll()
            .finally(() => this.loading = false)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });
    }
}