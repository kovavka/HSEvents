import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AbstractComponent } from '../../../../utilities/abstract.component';
import { StatisticService } from '../../statistic.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'exam-stat.component.html'
})
export class ExamStatComponent extends AbstractComponent implements OnInit {

    data: any[];

    constructor(private statisticService: StatisticService,
        protected changeDetectorRef: ChangeDetectorRef,
        protected authService: AuthService) {
        super(changeDetectorRef, authService);
    }
    
    ngOnInit() {
        this.statisticService.getExamStats()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                this.data = data;
                console.log(data);
            });

    }
}