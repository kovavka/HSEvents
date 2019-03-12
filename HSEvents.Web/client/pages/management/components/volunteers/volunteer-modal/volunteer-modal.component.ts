import { Component, Input, Output, EventEmitter, ViewChild, OnInit, ElementRef } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Volunteer, Group } from '../../../../../models/dictionaries.models';
import { GroupService } from '../../groups/groups.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'volunteer-modal',
    templateUrl: 'volunteer-modal.component.html',
    styleUrls: ['volunteer-modal.css'],
    providers: [GroupService]
})
export class VolunteerModalComponent implements OnInit {

    allGroups: Group[];
    fullName: string;
    group: Group;
    id: number;
    
    @ViewChild('modal')
    private modal: BsModalComponent;
    
    @Output()
    apply: EventEmitter<Volunteer> = new EventEmitter();

    constructor(private groupsService: GroupService) {}

    ngOnInit() {
        this.modal.onHide.subscribe(x => this.clear());
    }

    get title(): string {
        if (this.id)
            return 'Редактирование волонтера';

        return 'Добавление волонтера';
    }
    
    displayFunc(group: Group) {
        return group.name;
    }
    
    open(subject: Volunteer) {
        this.groupsService.getAll()
            .subscribe(data => this.allGroups = data);

        this.modal.open();
        this.fullName = subject.fullName;
        this.group = subject.group;
        this.id = subject.id;
    }

    onApplyClick() {
        this.apply.emit(<Volunteer>{
            fullName: this.fullName,
            group: this.group,
            id: this.id
        });
        this.modal.close();
    }

    onCancelClick() {
        this.clear();
        this.modal.close();
    }

    clear() {
        this.fullName = null;
        this.id = null;
    }
}