import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'streets.component.html',
    styleUrls: ['streets.component.css'],
    providers: [ManagementService]
})
export class StreetsComponent {

    constructor(private managementService: ManagementService) {
	}

}