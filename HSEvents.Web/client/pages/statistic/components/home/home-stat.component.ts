import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AbstractComponent } from '../../../../utilities/abstract.component';
import { StatisticService } from '../../statistic.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home-stat.component.html'
})
export class HomeStatComponent extends AbstractComponent {
    
    constructor(private statisticService: StatisticService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);
    }
}