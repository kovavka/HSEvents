import { Component, ChangeDetectorRef } from '@angular/core';
import { AbstractComponent } from '../utilities/abstract.component';
import { AuthService } from '../services/auth.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'top-menu',
	templateUrl: 'top-menu.component.html'
})
export class TopMenuComponent extends AbstractComponent {

    constructor(protected authService: AuthService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef, authService);
    }

	get login():string {
        return this.authService.userLogin;
	}


    logout() {
        this.authService.logout();
	}
}