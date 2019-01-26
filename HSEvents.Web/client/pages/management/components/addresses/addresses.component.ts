import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AddressService } from './addresses.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'addresses.component.html',
    styleUrls: ['addresses.component.css'],
    providers: [AddressService]
})
export class AddressesComponent extends SearchComponent implements OnInit {

    constructor(private addressService: AddressService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }

    ngOnInit() {
        this.getAllSubject
            .takeUntil(this.ngUnsubscribe)
            .subscribe(args => {
                this.getAll(args);
            });

        this.getAllSubject.next(this.searchArgs);
    }

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.addressService.getAll()
            .finally(() => this.loading = false)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });
    }
}