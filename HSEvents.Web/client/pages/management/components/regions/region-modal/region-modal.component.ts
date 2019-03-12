import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Region, Country } from '../../../../../models/address.models';
import { CountryService } from '../../countries/countries.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'region-modal',
    templateUrl: 'region-modal.component.html',
    styleUrls: ['region-modal.css'],
    providers: [CountryService]
})
export class RegionModalComponent implements OnInit{

    allCountries: Country[];
    country: Country;
    name: string;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<Region> = new EventEmitter();

    constructor(private countryService: CountryService) { }

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование региона';

        return 'Добавление региона';
    }

    displayFunc(country: Country) {
        return country.name;
    }
    
    open(subject: Region) {
        this.countryService.getAll()
            .subscribe(data => this.allCountries = data);

        this.modal.open();
        this.id = subject.id;
        this.name = subject.name;
        this.country = subject.country;
    }

    onApplyClick() {
        this.apply.emit(<Region>{
            name: this.name,
            country: this.country,
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

    countryChange(country: Country) {
        this.country = country;
    }
}