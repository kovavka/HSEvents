import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { AcademicProgram } from '../../../../../models/dictionaries.models';

@Component({
    moduleId: module.id.toString(),
    selector: 'academic-program-modal',
    templateUrl: 'academic-program-modal.component.html',
    styleUrls: ['academic-program-modal.css']
})
export class AcademicProgramModalComponent implements OnInit {
    
    name: string;
    id: number;

    @ViewChild('modal')
    private modal: BsModalComponent;

    @Output()
    apply: EventEmitter<AcademicProgram> = new EventEmitter();

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование академической программы';

        return 'Добавление академической программы';
    }

    open(program: AcademicProgram) {
        this.modal.open();
        this.name = program.name;
        this.id = program.id;
    }

    onApplyClick() {
        this.apply.emit(<AcademicProgram>{
            name: this.name,
            id: this.id
        });
        this.modal.close();
    }

    onCancelClick() {
        this.clear();
        this.modal.close();
    }

    clear() {
        this.name = null;
        this.id = null;
    }

}