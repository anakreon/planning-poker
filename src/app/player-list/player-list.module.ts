import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MatIconModule, MatMenuModule } from '@angular/material';

import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerListItemComponent } from './player-list-item/player-list-item.component';
import { PlayerListMenuComponent } from './player-list-menu/player-list-menu.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        SharedModule
    ],
    declarations: [
        PlayerListComponent,
        PlayerListItemComponent,
        PlayerListMenuComponent
    ],
    exports: [
        PlayerListComponent
    ]
})
export class PlayerListModule { }
