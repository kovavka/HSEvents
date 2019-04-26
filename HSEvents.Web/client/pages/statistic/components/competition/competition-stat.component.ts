import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AbstractComponent } from '../../../../utilities/abstract.component';
import { StatisticService } from '../../statistic.service';

declare var Chartist: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'competition-stat.component.html'
})
export class CompetitionStatComponent extends AbstractComponent implements OnInit {

    data: any[] = [];
    labels: string[];

    constructor(private statisticService: StatisticService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);

        this.labels = [];
    }
    
    ngOnInit() {
        this.statisticService.getCompetitionStats()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                this.data = data;
                console.log(data);

                if (data.length) {
                    this.initChart();
                }
            });
    }

    initChart() {
    }
}