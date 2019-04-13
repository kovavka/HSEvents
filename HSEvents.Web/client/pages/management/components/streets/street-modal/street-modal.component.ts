import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { City, Region, CityType, Country, Street } from '../../../../../models/address.models';
import { RegionService } from '../../regions/regions.service';
import { CityTypeService } from '../../city-types/city-types.service';
import { CountryService } from '../../countries/countries.service';
import { CityService } from '../../cities/cities.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'street-modal',
    templateUrl: 'street-modal.component.html',
    styleUrls: ['street-modal.css'],
    providers: [RegionService, CityTypeService, CountryService, CityService]
})
export class StreetModalComponent implements OnInit{

    allRegions: Region[];
    region: Region;
    allCountries: Country[];
    country: Country;
    cityTypes: CityType[];
    cityType: CityType;
    allCities: City[];
    city: City;
    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<Street> = new EventEmitter();

    constructor(private regionService: RegionService,
        private countryService: CountryService,
        private cityTypeService: CityTypeService,
        private cityService: CityService) { }

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование улицы';

        return 'Добавление улицы';
    }

    displayFunc(item: any) {
        return item.name;
    }

    open(street: Street) {
        this.initModal(street);
        this.modal.open();
    }

    initModal(street: Street) {
        if (street.city) {
            this.region = street.city.region;
            if (street.city.region)
                this.country = street.city.region.country;
        }
        this.city = street.city;

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
                    var possible = data.filter(x => x.id == this.city.cityType.id);
                    if (possible && possible.length == 1)
                        this.cityType = possible[0];
                } else {
                    this.cityType = data[0];
                }
            });

        this.name = street.name;
        this.id = street.id;
    }

    getRegions(countryName: string) {
        this.regionService.getAll(countryName)
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

                this.getCities(this.region.name, this.cityType.name);
            });
    }

    getCities(regionName: string, cityTypeName: string) {
        this.cityService.getAll(regionName, cityTypeName)
            .subscribe(data => {
                this.allCities = data;
                var possible: City;

                if (this.id)
                    possible = data.find(x => x.id == this.region.id);
                else
                    possible = data.find(x => x.name == 'Пермь');

                if (possible)
                    this.city = possible;
                else
                    this.city = data[0];
            });
    }

    onApplyClick() {
        this.apply.emit(<Street>{
            name: this.name,
            city: this.city,
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
        this.getCities(this.region.name, this.cityType.name);
    }

    countryChange(country: Country) {
        this.country = country;
        this.getRegions(country.name);
    }

    cityTypeChange(cityType: CityType) {
        this.cityType = cityType;
        this.getCities(this.region.name, this.cityType.name);
    }

    cityChange(city: City) {
        this.city = city;
    }
}