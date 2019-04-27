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

    selected: any;
    data: any[] = [];

    constructor(private statisticService: StatisticService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);
    }

    ngOnInit() {
        this.statisticService.getSeasonStats()
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
        var labels =
        [
            `Зима, ${values[0]}`,
            `Весна, ${values[1]}`,
            `Лето, ${values[1]}`,
            `Осень, ${values[3]}`
        ];
        
        new Chartist.Pie('.stat-container__chart-inner', {
            series: values,
            labels: labels
        }, {
            chartPadding: 40,
            labelOffset: 70,
            labelDirection: 'explode'
        });
    }

    yearClick(item: any) {
        this.selected = item;
        this.initChart(item.value);
    }
}