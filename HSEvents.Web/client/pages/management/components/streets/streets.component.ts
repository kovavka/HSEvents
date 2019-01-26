import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StreetService } from './streets.service';
import { SearchArgs } from '../../../../models/other.models';
import { SearchComponent } from '../search.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'streets.component.html',
    styleUrls: ['streets.component.css'],
    providers: [StreetService]
})
export class StreetsComponent extends SearchComponent implements OnInit {

    constructor(private streetService: StreetService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
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
        this.streetService.getAll()
            .takeUntil(this.ngUnsubscribe)
            .finally(() => this.loading = false)
            .subscribe(data => {
                console.log(data);
                this.changeDetectorRef.detectChanges();
            }, error => {

            });

    }
}