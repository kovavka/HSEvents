import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Address, City, Street } from '../../../../../models/address.models';
import { CityService } from '../../cities/cities.service';
import { StreetService } from '../../streets/streets.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'address-modal',
    templateUrl: 'address-modal.component.html',
    providers: [CityService, StreetService]
})
export class AddressModalComponent implements OnInit{

    allCities: City[];
    city: City;
    allStreets: Street[];
    street: Street;
    house: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<Address> = new EventEmitter();


    constructor(private cityService: CityService,
        private streetService: StreetService) { }

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование адреса';

        return 'Добавление адреса';
    }
    
    open(address: Address) {
        this.initModal(address);
        this.modal.open();
    }

    initModal(address: Address) {
        if (address.street) {
            this.street = address.street;
            if (address.street.city)
                this.city = address.street.city;
        }

        this.cityService.getAll()
            .subscribe(data => {
                this.allCities = data;
                var possible: City;

                if (this.id)
                    possible = data.find(x => x.id == this.city.id);
                else
                    possible = data.find(x => x.name == 'Пермь');

                if (possible)
                    this.city = possible;

                var cityId = this.city && this.city.id;

                this.getStreets(cityId);
            });

        this.house = address.house;
        this.id = address.id;
    }

    getStreets(cityId: number) {
        this.streetService.getAll(cityId)
            .subscribe(data => {
                this.allStreets = data;
                var possible: Street;

                if (this.id)
                    possible = data.find(x => x.id == this.street.id);

                if (possible)
                    this.street = possible;
                else
                    this.street = data[0];
            });
    }


    cityDisplayFunc(city: City) {
        return `${city.cityType.shortName} ${city.name} (${city.region.country.name}, ${city.region.name})`;
    }

    streetDisplayFunc(street: Street) {
        return street.name;
    }


    cityChange(city: City) {
        this.city = city;
        this.getStreets(city.id);
    }
    
    streetChange(street: Street) {
        this.street = street;
    }
    

    onApplyClick() {
        this.apply.emit(<Address>{
            id: this.id,
            house: this.house,
            street: this.street
        });
        this.modal.close();
    }

    onCancelClick() {
        this.clear();
        this.modal.close();
    }

    clear() {
        this.house = null;
        this.id = null;
    }


}