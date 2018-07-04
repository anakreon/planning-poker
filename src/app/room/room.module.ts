import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatGridListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RoomComponent } from './room/room.component';
import { CardComponent } from './card/card.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerListItemComponent } from './player-list-item/player-list-item.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        FlexLayoutModule
    ],
    declarations: [
        RoomComponent,
        CardComponent,
        CardContainerComponent,
        PlayerListComponent,
        PlayerListItemComponent
    ],
    exports: [
        RoomComponent
    ]
})
export class RoomModule { }
