import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'contact-persons.component.html',
    styleUrls: ['contact-persons.component.css'],
    providers: [ManagementService]
})
export class ContactPersonsComponent {

    constructor(private managementService: ManagementService) {
	}

}