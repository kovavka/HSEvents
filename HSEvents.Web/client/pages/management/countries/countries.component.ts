import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'countries.component.html',
    styleUrls: ['countries.component.css'],
    providers: [ManagementService]
})
export class CountriesComponent {

    constructor(private managementService: ManagementService) {
	}

}