import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbstractComponent } from '../../utilities/abstract.component';
import { AuthArgs } from '../../models/user.models';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})
export class LoginComponent extends AbstractComponent {

    login: string = "";
    password: string = "";

    constructor(protected router: Router,
        protected authService: AuthService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef, authService);
    }

    onLoginClick() {
        var authInfo = <AuthArgs>{
            login: this.login,
            password: this.password,
        }

        this.authService.login(authInfo)
            .subscribe(x => {
                this.router.navigate(['/events']);
            });
    }
}
