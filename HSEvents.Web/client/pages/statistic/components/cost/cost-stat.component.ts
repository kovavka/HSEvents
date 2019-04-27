import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AbstractComponent } from '../../../../utilities/abstract.component';
import { StatisticService } from '../../statistic.service';

declare var Chartist: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'cost-stat.component.html'
})
export class CostStatComponent extends AbstractComponent implements OnInit {

    selected: any;
    data: any[] = [1];
    labels: string[];

    constructor(private statisticService: StatisticService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);

        this.labels = [];
    }

    ngOnInit() {
        this.statisticService.getCostStats()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                this.data = data;

                if (data.length) {
                    var item = data[0];
                    this.selected = item;
                    this.initChart(item.value);
                }
            });
    }

    initChart(values: any[]) {
        var labels = values.map(x => x.sum);
        var series = [values.map(x => x.percent)];

        console.log(series);
        console.log(labels);


        var chartData = {
            labels: labels,
            series: series

        };

        new Chartist.Bar('.stat-container__chart-inner', chartData);
        //new Chartist.Line('.stat-container__chart-inner', chartData);
    }

    yearClick(item: any) {
        this.selected = item;
        this.initChart(item.value);
    }
}