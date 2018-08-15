import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatFormFieldModule, MatInputModule, MatStepperModule, MatTabsModule } from '@angular/material';

import { RoomModule } from '../room/room.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardTabComponent } from './dashboard-tab/dashboard-tab.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatStepperModule,
        MatTabsModule,
        RoomModule
    ],
    declarations: [
        DashboardComponent,
        DashboardTabComponent
    ]
})
export class DashboardModule { }
