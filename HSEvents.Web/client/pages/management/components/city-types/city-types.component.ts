import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CityTypeService } from './city-types.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { CityType } from '../../../../models/address.models';
import { CityTypeModalComponent } from './city-type-modal/city-type-modal.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'city-types.component.html',
    styleUrls: ['city-types.component.css'],
    providers: [CityTypeService]
})
export class CityTypesComponent extends SearchComponent implements OnInit {

    types: CityType[] = [];
    selected: CityType[] = [];

    constructor(private cityTypeService: CityTypeService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);
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
                this.selected = [];
                this.refreshView();
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

    onDeleteSeveralClick() {
        this.loading = true;
        this.cityTypeService.deleteSeveral(this.selected.map(x => x.id))
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

    onCheck($event: any, subject: CityType) {
        if ($event.target.checked)
            this.selected.push(subject);
        else
            this.selected.splice(this.selected.indexOf(subject), 1);
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