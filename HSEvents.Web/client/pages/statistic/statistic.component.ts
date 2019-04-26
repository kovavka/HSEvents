import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbstractComponent } from '../../utilities/abstract.component';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'statistic.component.html'
})
export class StatisticComponent extends AbstractComponent {

    constructor(protected router: Router,
        protected authService: AuthService,
        protected changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef, authService);
    }

}
