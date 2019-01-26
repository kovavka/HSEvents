import { OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs'

export class AbstractComponent implements OnDestroy{

    protected ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(protected changeDetectorRef: ChangeDetectorRef) {
    }

    refreshView() {
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}