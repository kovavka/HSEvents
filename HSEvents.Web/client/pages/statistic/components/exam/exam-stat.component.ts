import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AbstractComponent } from '../../../../utilities/abstract.component';
import { StatisticService } from '../../statistic.service';

declare var Chartist: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'exam-stat.component.html'
})
export class ExamStatComponent extends AbstractComponent implements OnInit {

    data: any[];
    labels: string[];

    constructor(private statisticService: StatisticService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);

        this.labels = [
            '0-10',
            '11-20',
            '21-30',
            '31-40',
            '41-50',
            '51-60',
            '61-70',
            '71-80',
            '81-90',
            '91-100'
        ];
    }
    
    ngOnInit() {
        this.statisticService.getExamStats()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                this.data = data;
                console.log(data);

                var series = [];
                for (var result of data[0].value) {
                    series.push([...result.value]);
                }

                var chartData = {
                    labels: this.labels,
                    series: series
                    
                };
                new Chartist.Bar('.ct-chart', chartData);


            });
    }
}