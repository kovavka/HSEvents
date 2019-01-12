import { Component, ViewChild } from '@angular/core';
import { ManagementService } from './../management.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'academic-programs.component.html',
    styleUrls: ['academic-programs.component.css'],
    providers: [ManagementService]
})
export class AcademicProgramsComponent {

    constructor(private managementService: ManagementService) {
	}

}