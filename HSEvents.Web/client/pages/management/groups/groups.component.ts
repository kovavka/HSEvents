import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.css'],
    providers: [ManagementService]
})
export class GroupsComponent {

    constructor(private managementService: ManagementService) {
	}

}