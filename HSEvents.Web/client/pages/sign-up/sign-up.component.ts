import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbstractComponent } from '../../utilities/abstract.component';
import { AttendeeDto } from '../../models/user.models';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'sign-up.component.html'
})
export class SignUpComponent extends AbstractComponent {

    login: string;
    password: string;
    type: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    sex: string;
    yearOfGraduation: string;
    interestingProgramIds: number[];
    schoolId: number;

    constructor(protected router: Router,
        protected authService: AuthService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef, authService);
    }

    onSignUpClick() {
        var attendee = <AttendeeDto>{
            login: this.login,
            password: this.password,
        }

        this.authService.signUp(attendee)
            .subscribe(x => {
                this.router.navigate(['/events']);
            });
    }
}
