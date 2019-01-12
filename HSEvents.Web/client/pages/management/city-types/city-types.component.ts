import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'city-types.component.html',
    styleUrls: ['city-types.component.css'],
    providers: [ManagementService]
})
export class CityTypesComponent {

    constructor(private managementService: ManagementService) {
	}

}