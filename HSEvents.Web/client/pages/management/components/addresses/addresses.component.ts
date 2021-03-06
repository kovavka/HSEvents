﻿import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AddressService } from './addresses.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { Address } from '../../../../models/address.models';
import { AddressModalComponent } from './address-modal/address-modal.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'addresses.component.html',
    styleUrls: ['addresses.component.css'],
    providers: [AddressService]
})
export class AddressesComponent extends SearchComponent implements OnInit {

    addresses: Address[] = [];
    selected: Address[] = [];

    constructor(private addressService: AddressService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);
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
                this.selected = [];
                this.refreshView();
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

    onDeleteSeveralClick() {
        this.loading = true;
        this.addressService.deleteSeveral(this.selected.map(x => x.id))
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(address: Address) {
        if (address.id)
            this.update(address);
        else
            this.add(address);
    }

    onCheck($event: any, address: Address) {
        if ($event.target.checked)
            this.selected.push(address);
        else
            this.selected.splice(this.selected.indexOf(address), 1);
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