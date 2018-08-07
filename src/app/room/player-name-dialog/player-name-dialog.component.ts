import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-player-name-dialog',
    templateUrl: './player-name-dialog.component.html',
    styleUrls: ['./player-name-dialog.component.css']
})
export class PlayerNameDialogComponent implements OnInit {

    public playerNameFormGroup: FormGroup;

    constructor (private formBuilder: FormBuilder, public dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) private data: any) {}

    public ngOnInit () {
        this.playerNameFormGroup = this.formBuilder.group({
            playerNameCtrl: ['', Validators.required]
        });
        this.playerNameFormGroup.reset({
            playerNameCtrl: this.data.defaultPlayerName || ''
        });
    }

    public closeDialog (): void {
        if (!this.playerNameFormGroup.invalid) {
            const playerName = this.playerNameFormGroup.value.playerNameCtrl as string;
            this.dialogRef.close(playerName);
        }
    }

}
