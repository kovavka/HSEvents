import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs'
import { AbstractComponent } from '../../../utilities/abstract.component';
import { SearchArgs } from '../../../models/other.models';
import { AuthService } from '../../../services/auth.service';

export class SearchComponent extends AbstractComponent implements OnInit {

    loading: boolean = false;
    protected  getAllSubject: Subject<SearchArgs> = new Subject();
    protected searchArgs: SearchArgs;

    constructor(protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);

        this.searchArgs = <SearchArgs>{
            limit: 100,
            offset: 0,
            searchText: ''
        }
    }

    ngOnInit() {
        this.getAllSubject.next(this.searchArgs);
    }
}