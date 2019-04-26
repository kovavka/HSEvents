import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AbstractComponent } from '../../../../utilities/abstract.component';
import { StatisticService } from '../../statistic.service';

declare var Chartist: any;
declare var jQuery: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'season-stat.component.html'
})
export class SeasonStatComponent extends AbstractComponent implements OnInit {

    data: any[] = [];
    labels: string[];

    constructor(private statisticService: StatisticService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);

        this.labels = [];
    }

    ngOnInit() {
        this.statisticService.getSeasonStats()
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

        var series= [30, 17, 5];

        new Chartist.Pie('.stat-container__chart-inner', {
            series: series,
            labels: ['Series 1', 'Series 2', 'Series 3']
        },{
                chartPadding: 40,
                labelOffset: 70,
                labelDirection: 'explode'
        });
    }
}