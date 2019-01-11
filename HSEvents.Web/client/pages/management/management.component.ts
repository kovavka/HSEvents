import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'management.component.html',
    styleUrls: ['management.component.css'],
    providers: [ManagementService]
})
export class ManagementComponent {

    constructor(private managementService: ManagementService) {
	}

}