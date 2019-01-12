import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs'

export class AbstractComponent implements OnDestroy{

    protected  ngUnsubscribe: Subject<void> = new Subject<void>();

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}