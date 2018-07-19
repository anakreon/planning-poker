import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule,
    MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RoomComponent } from './room/room.component';
import { CardComponent } from './card/card.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerListItemComponent } from './player-list-item/player-list-item.component';
import { PlayerNameDialogComponent } from './player-name-dialog/player-name-dialog.component';
import { RoomPlayerListComponent } from './room-player-list/room-player-list.component';
import { RoomCardsComponent } from './room-cards/room-cards.component';
import { PlayerListMenuComponent } from './player-list-menu/player-list-menu.component';
import { RoomTimerComponent } from './room-timer/room-timer.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        FlexLayoutModule
    ],
    declarations: [
        RoomComponent,
        CardComponent,
        CardContainerComponent,
        PlayerListComponent,
        PlayerListItemComponent,
        PlayerNameDialogComponent,
        RoomPlayerListComponent,
        RoomCardsComponent,
        PlayerListMenuComponent,
        RoomTimerComponent,
        TimerComponent
    ],
    exports: [
        RoomComponent
    ],
    entryComponents: [
        PlayerNameDialogComponent
    ],
    providers: [{
        provide: MAT_DIALOG_DEFAULT_OPTIONS, 
        useValue: {
            hasBackdrop: false
        }
    }]
})
export class RoomModule { }
