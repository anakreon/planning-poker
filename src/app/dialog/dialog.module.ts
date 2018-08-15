import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

import { DialogGetPlayerNameComponent } from './dialog-get-player-name/dialog-get-player-name.component';

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
        DialogGetPlayerNameComponent
    ],
    providers: [{
        provide: MAT_DIALOG_DEFAULT_OPTIONS,
        useValue: {
            hasBackdrop: false
        }
    }],
    exports: [
        DialogGetPlayerNameComponent
    ],
    entryComponents: [
        DialogGetPlayerNameComponent
    ]
})
export class DialogModule { }
