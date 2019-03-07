import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { StreetService } from './streets.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { Street } from '../../../../models/address.models';
import { StreetModalComponent } from './street-modal/street-modal.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'streets.component.html',
    styleUrls: ['streets.component.css'],
    providers: [StreetService]
})
export class StreetsComponent extends SearchComponent implements OnInit {

    streets: Street[];

    constructor(private streetService: StreetService,
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
    private modal: StreetModalComponent;

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.streetService.getAll()
            .takeUntil<Street[]>(this.ngUnsubscribe)
            .finally(() => this.loading = false)
            .subscribe(data => {
                this.streets = data;
                this.changeDetectorRef.detectChanges();
            }, error => {

            });
    }

    onAddClick() {
        this.modal.open(new Street());
    }

    onEditClick(street: Street) {
        this.modal.open(street);
    }

    onDeleteClick(street: Street) {
        this.loading = true;
        this.streetService.delete(street.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(street: Street) {
        if (street.id)
            this.update(street);
        else
            this.add(street);
    }

    private add(street: Street) {
        this.streetService.add(street)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(street: Street) {
        this.streetService.update(street)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }
}