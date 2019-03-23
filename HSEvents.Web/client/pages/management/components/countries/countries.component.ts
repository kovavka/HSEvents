import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CountryService } from './countries.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { Country } from '../../../../models/address.models';
import { CountryModalComponent } from './country-modal/country-modal.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'countries.component.html',
    styleUrls: ['countries.component.css'],
    providers: [CountryService]
})
export class CountriesComponent extends SearchComponent implements OnInit {

    countries: Country[] = [];
    selected: Country[] = [];

    constructor(private countryService: CountryService,
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
    private modal: CountryModalComponent;

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.countryService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<Country[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.countries = data;
                this.selected = [];
                this.refreshView();
            }, error => {

            });
    }

    onAddClick() {
        this.modal.open(new Country());
    }

    onEditClick(country: Country) {
        this.modal.open(country);
    }

    onDeleteClick(country: Country) {
        this.loading = true;
        this.countryService.delete(country.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onDeleteSeveralClick() {
        this.loading = true;
        this.countryService.deleteSeveral(this.selected.map(x => x.id))
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(country: Country) {
        if (country.id)
            this.update(country);
        else
            this.add(country);
    }

    onCheck($event: any, country: Country) {
        if ($event.target.checked)
            this.selected.push(country);
        else
            this.selected.splice(this.selected.indexOf(country), 1);
    }

    private add(country: Country) {
        this.countryService.add(country)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(country: Country) {
        this.countryService.update(country)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });

    }
}