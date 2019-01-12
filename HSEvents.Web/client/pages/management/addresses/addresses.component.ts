import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'addresses.component.html',
    styleUrls: ['addresses.component.css'],
    providers: [ManagementService]
})
export class AddressesComponent {

    constructor(private managementService: ManagementService) {
	}

}