import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

import { DialogGetPlayerNameComponent } from './dialog-get-player-name/dialog-get-player-name.component';
import { DialogEvictedFromRoomComponent } from './dialog-evicted-from-room/dialog-evicted-from-room.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [
        DialogGetPlayerNameComponent,
        DialogEvictedFromRoomComponent
    ],
    providers: [{
        provide: MAT_DIALOG_DEFAULT_OPTIONS,
        useValue: {
            hasBackdrop: false
        }
    }],
    exports: [
        DialogGetPlayerNameComponent,
        DialogEvictedFromRoomComponent
    ],
    entryComponents: [
        DialogGetPlayerNameComponent,
        DialogEvictedFromRoomComponent
    ]
})
export class DialogModule { }
