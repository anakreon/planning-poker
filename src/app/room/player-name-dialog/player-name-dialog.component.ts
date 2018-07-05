import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-player-name-dialog',
    templateUrl: './player-name-dialog.component.html',
    styleUrls: ['./player-name-dialog.component.css']
})
export class PlayerNameDialogComponent implements OnInit {

    public playerNameFormGroup: FormGroup;

    constructor (private formBuilder: FormBuilder, public dialogRef: MatDialogRef<string>) {}

    public ngOnInit () {
        this.playerNameFormGroup = this.formBuilder.group({
            playerNameCtrl: ['', Validators.required]
        });
    }

    public closeDialog (): void {
        if (!this.playerNameFormGroup.invalid) {
            const playerName = this.playerNameFormGroup.value.playerNameCtrl as string;
            this.dialogRef.close(playerName);
        }
    }

}
