import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AbstractComponent } from '../../../../utilities/abstract.component';
import { StatisticService } from '../../statistic.service';

declare var Chartist: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'events-count-stat.component.html'
})
export class EventsCountStatComponent extends AbstractComponent implements OnInit {

    selected: any;
    data: any[] = [];

    constructor(private statisticService: StatisticService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);

    }

    ngOnInit() {
        this.statisticService.getEventsCountStats()
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
        var labels = values.map(x => x.eventsCount);
        var series = [values.map(x => x.attendeesCount)];
        
        console.log(series);
        console.log(labels);


        var chartData = {
            labels: labels,
            series: series

        };
        new Chartist.Bar('.stat-container__chart-inner', chartData, {
            axisY: { onlyInteger: true }
        });
    }

    yearClick(item: any) {
        this.selected = item;
        this.initChart(item.value);
    }
}