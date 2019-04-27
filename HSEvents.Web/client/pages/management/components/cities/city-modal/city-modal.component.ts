import { Component, Output, EventEmitter, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalComponent } from 'ng2-bs3-modal';
import { City, Region, CityType, Country } from '../../../../../models/address.models';
import { RegionService } from '../../regions/regions.service';
import { CityTypeService } from '../../city-types/city-types.service';
import { CountryService } from '../../countries/countries.service';
import { SearchComponent } from '../../search.component';
import { AuthService } from '../../../../../services/auth.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'city-modal',
    templateUrl: 'city-modal.component.html',
    providers: [RegionService, CityTypeService, CountryService]
})
export class CityModalComponent extends SearchComponent implements OnInit{

    allRegions: Region[];
    region: Region;
    allCountries: Country[];
    country: Country;
    cityTypes: CityType[];
    cityType: CityType;
    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<City> = new EventEmitter();

    constructor(private regionService: RegionService,
        private countryService: CountryService,
        private cityTypeService: CityTypeService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);
    }

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование населенного пункта';

        return 'Добавление населенного пункта';
    }

    countryDisplayFunc(country: Country) {
        return country.name;
    }
    
    regionDisplayFunc(region: Region) {
        return region.name;
    }
    
    open(city: City) {
        this.initModal(city);
        this.modal.open();
    }

    initModal(city: City) {
        if (city.region)
            this.country = city.region.country;
        this.region = city.region;

        this.countryService.getAll()
            .subscribe(data => {
                this.allCountries = data;
                var possible: Country;

                if (this.id)
                    possible = data.find(x => x.id == this.country.id);
                else
                    possible = data.find(x => x.name == 'Россия');

                if (possible)
                    this.country = possible;

                var countryName = this.country && this.country.name;

                this.getRegions(countryName);
            });
        

        this.cityTypeService.getAll()
            .subscribe(data => {
                this.cityTypes = data;
                if (this.id) {
                    var possible = data.filter(x => x.id == city.cityType.id);
                    if (possible && possible.length == 1)
                        this.cityType = possible[0];
                } else {
                    this.cityType = data[0];
                }
            });

        this.id = city.id;
        this.name = city.name;
    }

    getRegions(countryName: string) {
        this.regionService.getAll(countryName)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                this.allRegions = data;
                var possible: Region;

                if (this.id)
                    possible = data.find(x => x.id == this.region.id);
                else
                    possible = data.find(x => x.name == 'Пермский край');

                if (possible)
                    this.region = possible;
                else
                    this.region = data[0];
            });
    }

    onApplyClick() {
        this.apply.emit(<City>{
            name: this.name,
            region: this.region,
            cityType: this.cityType,
            id: this.id
        });
        this.modal.close();
    }

    onCancelClick() {
        this.clear();
        this.modal.close();
    }

    clear() {
        this.name = null;
        this.id = null;
    }

    regionChange(region: Region) {
        this.region = region;
    }

    countryChange(country: Country) {
        this.country = country;
        this.getRegions(country.name);
    }

    cityTypeChange(cityType: CityType) {
        this.cityType = cityType;
    }
}