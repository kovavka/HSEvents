﻿import { Component, OnInit } from '@angular/core';
import { GroupService } from './groups.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'groups.component.html',
    styleUrls: ['groups.component.css'],
    providers: [GroupService]
})
export class GroupsComponent extends SearchComponent implements OnInit {

    constructor(private groupService: GroupService) {
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
        this.groupService.getAll()
            .finally(() => this.loading = false)
            .subscribe(data => {
                console.log(data);
            }, error => {

            });

    }
}