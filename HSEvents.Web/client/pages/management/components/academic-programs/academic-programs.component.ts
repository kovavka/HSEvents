import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs'
import { AcademicProgramService } from './academic-programs.service';
import { AbstractComponent } from '../../../../utilities/abstract.component';
import { AcademicProgram } from '../../../../models/dictionaries.models';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'academic-programs.component.html',
    styleUrls: ['academic-programs.component.css'],
    providers: [AcademicProgramService]
})
export class AcademicProgramsComponent extends SearchComponent implements OnInit {
    
    constructor(private academicProgramService: AcademicProgramService) {
        super();
    }

    ngOnInit() {
        this.getAllSubject
            .takeUntil(this.ngUnsubscribe)
            .subscribe(args => {
                this.getAll(args);
            });

        this.getAllSubject.next(this.searchArgs);
    }

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.academicProgramService.getAll()
            .finally(() => this.loading = false)
            .subscribe(data => {
                console.log(data);
            }, error => {
                
            });
    }
}