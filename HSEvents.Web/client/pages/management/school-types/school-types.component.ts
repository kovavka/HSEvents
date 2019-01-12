import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'school-types.component.html',
    styleUrls: ['school-types.component.css'],
    providers: [ManagementService]
})
export class SchoolTypesComponent {

    constructor(private managementService: ManagementService) {
	}

}