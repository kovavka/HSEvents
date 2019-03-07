import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AddressService } from './addresses.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { Address } from '../../../../models/address.models';
import { AddressModalComponent } from './address-modal/address-modal.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'addresses.component.html',
    styleUrls: ['addresses.component.css'],
    providers: [AddressService]
})
export class AddressesComponent extends SearchComponent implements OnInit {

    addresses: Address[];

    constructor(private addressService: AddressService,
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
    private modal: AddressModalComponent;

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.addressService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<Address[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.addresses = data;
            }, error => {

            });
    }

    onAddClick() {
        this.modal.open(new Address());
    }

    onEditClick(address: Address) {
        this.modal.open(address);
    }

    onDeleteClick(address: Address) {
        this.loading = true;
        this.addressService.delete(address.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(address: Address) {
        if (group.id)
            this.update(address);
        else
            this.add(address);
    }

    private add(address: Address) {
        this.addressService.add(address)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(address: Address) {
        this.addressService.update(address)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });

    }
}