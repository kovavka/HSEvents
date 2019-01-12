import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'departments.component.html',
    styleUrls: ['departments.component.css'],
    providers: [ManagementService]
})
export class DepartmentsComponent {

    constructor(private managementService: ManagementService) {
	}

}