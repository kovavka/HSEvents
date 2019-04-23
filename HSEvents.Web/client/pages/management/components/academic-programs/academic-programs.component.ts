import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs'
import { AcademicProgramService } from './academic-programs.service';
import { AcademicProgram } from '../../../../models/dictionaries.models';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { AcademicProgramModalComponent } from './academic-program-modal/academic-program-modal.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'academic-programs.component.html',
    styleUrls: ['academic-programs.component.css'],
    providers: [AcademicProgramService]
})
export class AcademicProgramsComponent extends SearchComponent implements OnInit {

    programs: AcademicProgram[] = [];
    selected: AcademicProgram[] = [];

    constructor(private academicProgramService: AcademicProgramService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);
    }

    @ViewChild('modal')
    private modal: AcademicProgramModalComponent;

    ngOnInit() {
        this.getAllSubject
            .takeUntil<SearchArgs>(this.ngUnsubscribe)
            .subscribe(args => {
                this.getAll(args);
            });

        this.getAllSubject.next(this.searchArgs);
    }

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.academicProgramService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<AcademicProgram[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.programs = data;
                this.selected = [];
                this.refreshView();
            }, error => {
                
            });
    }
    onAddClick() {
        this.modal.open(new AcademicProgram());
    }

    onEditClick(program: AcademicProgram) {
        this.modal.open(program);
    }

    onDeleteClick(program: AcademicProgram) {
        this.loading = true;
        this.academicProgramService.delete(program.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onDeleteSeveralClick() {
        this.loading = true;
        this.academicProgramService.deleteSeveral(this.selected.map(x => x.id))
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(program: AcademicProgram) {
        if (program.id)
            this.update(program);
        else
            this.add(program);
    }

    onCheck($event: any, program: AcademicProgram) {
        if ($event.target.checked)
            this.selected.push(program);
        else
            this.selected.splice(this.selected.indexOf(program), 1);
    }

    private add(program: AcademicProgram) {
        this.academicProgramService.add(program)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(program: AcademicProgram) {
        this.academicProgramService.update(program)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });

    }
}