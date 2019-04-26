import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StatisticService } from './statistic.service';
import { StatisticComponent } from './statistic.component';
import { ExamStatComponent } from './components/exam/exam-stat.component';
import { SeasonStatComponent } from './components/season/season-stat.component';
import { CompetitionStatComponent } from './components/competition/competition-stat.component';
import { CostStatComponent } from './components/cost/cost-stat.component';
import { EventsCountStatComponent } from './components/events-count/events-count-stat.component';
import { HomeStatComponent } from './components/home/home-stat.component';

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
        StatisticComponent,
        CompetitionStatComponent,
        SeasonStatComponent,
        CostStatComponent,
        EventsCountStatComponent,
        HomeStatComponent
    ]
})
export class StatisticModule { }