import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'volunteers.component.html',
    styleUrls: ['volunteers.component.css'],
    providers: [ManagementService]
})
export class VolunteersComponent {

    constructor(private managementService: ManagementService) {
	}

}