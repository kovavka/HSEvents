import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'schools.component.html',
    styleUrls: ['schools.component.css'],
    providers: [ManagementService]
})
export class SchoolsComponent {

    constructor(private managementService: ManagementService) {
	}

}