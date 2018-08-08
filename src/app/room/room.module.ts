import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule } from '@angular/material';

import { BackendModule } from '../backend/backend.module';
import { DialogModule } from '../dialog/dialog.module';
import { PlayerListModule } from '../player-list/player-list.module';
import { TimerModule } from '../timer/timer.module';
import { VoteCardsModule } from '../vote-cards/vote-cards.module';
import { VoteResultCardsModule } from '../vote-result-cards/vote-result-cards.module';
import { VoteResultChartModule } from '../vote-result-chart/vote-result-chart.module';

import { RoomComponent } from './room/room.component';
import { RoomPlayerListComponent } from './room-player-list/room-player-list.component';
import { RoomCardsComponent } from './room-cards/room-cards.component';
import { RoomTimerComponent } from './room-timer/room-timer.component';
import { RoomActionsComponent } from './room-actions/room-actions.component';
import { RoomLoaderComponent } from './room-loader/room-loader.component';
import { RoomPlayerCardsComponent } from './room-player-cards/room-player-cards.component';
import { SharedModule } from '../shared/shared.module';
import { RoomRoutingModule } from './room-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        DialogModule,
        BackendModule,
        PlayerListModule,
        SharedModule,
        TimerModule,
        VoteCardsModule,
        VoteResultCardsModule,
        VoteResultChartModule,
        RoomRoutingModule
    ],
    declarations: [
        RoomComponent,
        RoomPlayerListComponent,
        RoomCardsComponent,
        RoomTimerComponent,
        RoomActionsComponent,
        RoomLoaderComponent,
        RoomPlayerCardsComponent
    ],
    exports: [
        RoomComponent
    ]
})
export class RoomModule { }
