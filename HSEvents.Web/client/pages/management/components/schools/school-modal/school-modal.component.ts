import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { School, SchoolType } from '../../../../../models/school.models';
import { Address, City, Street } from '../../../../../models/address.models';
import { CityService } from '../../cities/cities.service';
import { AddressService } from '../../addresses/addresses.service';
import { SchoolTypeService } from '../../school-types/school-types.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'school-modal',
    templateUrl: 'school-modal.component.html',
    providers: [CityService, AddressService, SchoolTypeService ]
})
export class SchoolModalComponent implements OnInit{

    allCities: City[];
    allAddresses: Address[];
    schoolTypes: SchoolType[];
    addresses: AddressDto[];
    schoolType: SchoolType;
    name: string;
    number: number;
    belongToUniversityDistrict: boolean;
    hasPriority: boolean;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<School> = new EventEmitter();

    constructor(private cityService: CityService,
        private addressService: AddressService,
        private schoolTypeService: SchoolTypeService) { }

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование образовательного учреждения';

        return 'Добавление образовательного учреждения';
    }
    
    open(school: School) {
        this.initModal(school);
        this.modal.open();
    }

    initModal(school: School) {
        if (school.addresses && school.addresses.length ) {
            this.addresses = school.addresses.map(x => {
               return <AddressDto> {
                    address: x,
                    city: x.street.city
                }
            });
        }
        else {
            this.addresses = [new AddressDto];
        }

        this.cityService.getAll()
            .subscribe(data => {
                this.allCities = data;
            });

        this.addressService.getAll()
            .subscribe(data => {
                this.allAddresses = data;
            });

        this.schoolTypeService.getAll()
            .subscribe(data => {
                this.schoolTypes = data;
                if (this.id) {
                    var possible = data.filter(x => x.id == school.type.id);
                    if (possible && possible.length == 1)
                        this.schoolType = possible[0];
                } else {
                    this.schoolType = data[0];
                }
            });

        this.name = school.name;
        this.number = school.number;
        this.belongToUniversityDistrict = school.belongToUniversityDistrict;
        this.hasPriority = school.hasPriority;
        this.id = school.id;
    }

    getAddresses(item: AddressDto) {
        if (!item.city || !this.allAddresses)
            return [];

        return this.allAddresses.filter(x => x.street.city.id == item.city.id);
    }


    cityDisplayFunc(city: City) {
        return `${city.cityType.shortName} ${city.name} (${city.region.country.name}, ${city.region.name})`;
    }

    addressDisplayFunc(address: Address) {
        return `${address.street.name}, ${address.house}`;
    }
    
    cityChange(city: City, item: AddressDto) {
        item.city = city;
        item.address = null;
    }

    addressChange(address: Address, item: AddressDto) {
        item.address = address;
    }

    addAddress() {
        this.addresses.push(new AddressDto());
    }



    onApplyClick() {
        this.apply.emit(<School>{
            name: this.name,
            type: this.schoolType,
            number: this.number,
            belongToUniversityDistrict: this.belongToUniversityDistrict,
            hasPriority: this.hasPriority,
            addresses: this.addresses.map(x => x.address),
            contacts: [],
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
}

class AddressDto {
    address: Address;
    city: City;
}