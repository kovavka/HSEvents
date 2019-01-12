import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'cities.component.html',
    styleUrls: ['cities.component.css'],
    providers: [ManagementService]
})
export class CitiesComponent {

    constructor(private managementService: ManagementService) {
	}

}