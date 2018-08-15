import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { VoteResultChartComponent } from './vote-result-chart/vote-result-chart.component';

@NgModule({
    imports: [
        CommonModule,
        Ng2GoogleChartsModule
    ],
    declarations: [
        VoteResultChartComponent
    ],
    exports: [
        VoteResultChartComponent
    ]
})
export class VoteResultChartModule { }
