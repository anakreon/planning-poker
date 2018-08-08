import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';

import { TimerComponent } from './timer/timer.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule
    ],
    declarations: [
        TimerComponent
    ],
    exports: [
        TimerComponent
    ]
})
export class TimerModule { }
