import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CityTypeService } from './city-types.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { CityType } from '../../../../models/address.models';
import { CityTypeModalComponent } from './city-type-modal/city-type-modal.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'city-types.component.html',
    styleUrls: ['city-types.component.css'],
    providers: [CityTypeService]
})
export class CityTypesComponent extends SearchComponent implements OnInit {

    types: CityType[] = [];

    constructor(private cityTypeService: CityTypeService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }

    @ViewChild('modal')
    private modal: CityTypeModalComponent;

    ngOnInit() {
        this.getAllSubject
            .takeUntil<SearchArgs>(this.ngUnsubscribe)
            .subscribe(args => {
                this.getAll(args);
            });

        this.getAllSubject.next(this.searchArgs);
    }

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.cityTypeService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<CityType[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.types = data;
            }, error => {

            });
    }

    onAddClick() {
        this.modal.open(new CityType());
    }

    onEditClick(type: CityType) {
        this.modal.open(type);
    }

    onDeleteClick(type: CityType) {
        this.loading = true;
        this.cityTypeService.delete(type.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(subject: CityType) {
        if (subject.id)
            this.update(subject);
        else
            this.add(subject);
    }

    private add(type: CityType) {
        this.cityTypeService.add(type)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(type: CityType) {
        this.cityTypeService.update(type)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });

    }
}