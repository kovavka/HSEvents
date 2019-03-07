import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CityService } from './cities.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { City } from '../../../../models/address.models';
import { CityModalComponent } from './city-modal/city-modal.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'cities.component.html',
    styleUrls: ['cities.component.css'],
    providers: [CityService]
})
export class CitiesComponent extends SearchComponent implements OnInit {

    cities: City[];

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

    @ViewChild('modal')
    private modal: CityModalComponent;

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.cityService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<City[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.cities = data;
            }, error => {

            });
    }
    
    onAddClick() {
        this.modal.open(new City());
    }

    onEditClick(city: City) {
        this.modal.open(city);
    }

    onDeleteClick(city: City) {
        this.loading = true;
        this.cityService.delete(city.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(city: City) {
        if (city.id)
            this.update(city);
        else
            this.add(city);
    }

    private add(city: City) {
        this.cityService.add(city)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(city: City) {
        this.cityService.update(city)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }
}