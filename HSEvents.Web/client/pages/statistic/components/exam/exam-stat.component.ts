import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AbstractComponent } from '../../../../utilities/abstract.component';
import { StatisticService } from '../../statistic.service';

declare var Chartist: any;
declare var jQuery: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'exam-stat.component.html'
})
export class ExamStatComponent extends AbstractComponent implements OnInit {

    selected: any;
    subject: string;
    data: any[] = [];
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

                if (data.length) {
                    var item = data[0];
                    this.selected = item;
                    this.initChart(item.value);
                }
            });
    }

    initChart(values: any[]) {
        var series = [];

        if (!this.subject) {
            for (var result of values) {
                series.push([...result.value]);
            }
        } else {
            series.push([...values.find(x => x.subject == this.subject).value]);
        }

        var chartData = {
            labels: this.labels,
            series: series

        };
        new Chartist.Bar('.stat-container__chart-inner', chartData);
    }

    yearClick(item: any) {
        this.selected = item;
        this.subject = null;
        this.initChart(item.value);
    }

    getColorStyle(index: number, subject: string) {
        if (this.subject) {
            if (this.subject != subject)
                return '';

            return  jQuery('.ct-series-a .ct-bar').css("stroke");
        }

        var char = String.fromCharCode(97 + index);
        var className = `.ct-series-${char} .ct-bar`;
        return jQuery(className).css("stroke");
    }

    onLegendClick(subject: string) {
        if (this.subject != subject) {
            this.subject = subject;
        } else {
            this.subject = null;
        }

        this.initChart(this.selected.value);
    }

    getLegendClass(subject: string) {
        if (this.subject && this.subject != subject)
            return 'legend-item_disabled';

        return '';
    }
}