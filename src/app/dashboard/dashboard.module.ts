import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
    MatButtonModule, MatButtonToggleModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatListModule, MatStepperModule,
    MatTabsModule
} from '@angular/material';

import { RoomModule } from '../room/room.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardTabCreateComponent } from './dashboard-tab-create/dashboard-tab-create.component';
import { DashboardTabJoinComponent } from './dashboard-tab-join/dashboard-tab-join.component';
import { DashboardCardPickerComponent } from './dashboard-card-picker/dashboard-card-picker.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatStepperModule,
        MatTabsModule,
        RoomModule,
        SharedModule
    ],
    declarations: [
        DashboardComponent,
        DashboardTabCreateComponent,
        DashboardTabJoinComponent,
        DashboardCardPickerComponent
    ]
})
export class DashboardModule { }
