import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GroupService } from './groups.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';
import { GroupModalComponent } from './group-modal/group-modal.component';
import { Group } from '../../../../models/dictionaries.models';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.css'],
    providers: [GroupService]
})
export class GroupsComponent extends SearchComponent implements OnInit {

    groups: Group[] = [];

    constructor(private groupService: GroupService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
    }

    ngOnInit() {
        this.getAllSubject
            .takeUntil<SearchArgs>(this.ngUnsubscribe)
            .subscribe(args => {
                this.getAll(args);
            });

        this.getAllSubject.next(this.searchArgs);
    }

    @ViewChild('modal')
    private modal: GroupModalComponent;

    private getAll(args: SearchArgs) {
        this.loading = true;
        this.groupService.getAll()
            .finally(() => this.loading = false)
            .takeUntil<Group[]>(this.ngUnsubscribe)
            .subscribe(data => {
                this.groups = data;
            }, error => {

            });
    }

    onAddClick() {
        this.modal.open(new Group());
    }

    onEditClick(subject: Group) {
        this.modal.open(subject);
    }

    onDeleteClick(group: Group) {
        this.loading = true;
        this.groupService.delete(group.id)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    onModalApply(group: Group) {
        if (group.id)
            this.update(group);
        else
            this.add(group);
    }

    private add(group: Group) {
        this.groupService.add(group)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });
    }

    private update(group: Group) {
        this.groupService.update(group)
            .subscribe(x => {
                this.getAll(this.searchArgs);
            });

    }
}