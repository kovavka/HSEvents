import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'regions.component.html',
    styleUrls: ['regions.component.css'],
    providers: [ManagementService]
})
export class RegionsComponent {

    constructor(private managementService: ManagementService) {
	}

}