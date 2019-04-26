import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StatisticService } from './statistic.service';
import { StatisticComponent } from './statistic.component';
import { ExamStatComponent } from './components/exam/exam-stat.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    providers: [
        StatisticService
    ],
    declarations: [
        ExamStatComponent,
        StatisticComponent
    ]
})
export class StatisticModule { }