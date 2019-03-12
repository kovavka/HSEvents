import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { City, Region, CityType } from '../../../../../models/address.models';
import { RegionService } from '../../regions/regions.service';
import { CityTypeService } from '../../city-types/city-types.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'city-modal',
    templateUrl: 'city-modal.component.html',
    styleUrls: ['city-modal.css'],
    providers: [RegionService, CityTypeService]
})
export class CityModalComponent implements OnInit{

    allRegions: Region[];
    region: Region;
    cityTypes: CityType[];
    cityType: CityType;
    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<City> = new EventEmitter();

    constructor(private regionService: RegionService,
        private cityTypeService: CityTypeService) { }

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование населенного пункта';

        return 'Добавление населенного пункта';
    }

    displayFunc(region: Region) {
        return region.name;
    }
    
    open(city: City) {
        this.initModal(city);
        this.modal.open();
    }

    initModal(city: City) {
        this.regionService.getAll()
            .subscribe(data => {
                this.allRegions = data;
                var possible = data.filter(x => x.id == city.regionId);
                if (possible && possible.length == 1)
                    this.region = possible[0];
            });

        this.cityTypeService.getAll()
            .subscribe(data => {
                this.cityTypes = data;
                var possible = data.filter(x => x.id == city.cityTypeId);
                if (possible && possible.length == 1)
                    this.cityType = possible[0];
            });

        this.id = city.id;
        this.name = city.name;
    }

    onApplyClick() {
        this.apply.emit(<City>{
            name: this.name,
            regionId: this.region.id,
            cityTypeId: this.cityType.id,
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

    cityTypeChange(cityType: CityType) {
        this.cityType = cityType;
    }
}