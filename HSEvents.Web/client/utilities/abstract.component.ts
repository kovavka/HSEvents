import { OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs'
import { AuthService } from '../services/auth.service';

export class AbstractComponent implements OnDestroy{

    protected ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
    }

    get isAdmin(): boolean {
        return this.authService.isAdmin;
    }

    get isEmployee(): boolean {
        return this.authService.isEmployee;
    }

    get isAttendee(): boolean {
        return this.authService.isAttendee;
    }

    get isAuth(): boolean {
        return this.authService.isAuth;
    }

    refreshView() {
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}