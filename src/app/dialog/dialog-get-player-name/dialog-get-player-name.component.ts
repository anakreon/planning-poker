import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface DialogData {
    defaultPlayerName: string;
}

@Component({
    selector: 'app-dialog-get-player-name',
    templateUrl: './dialog-get-player-name.component.html',
    styleUrls: ['./dialog-get-player-name.component.css']
})
export class DialogGetPlayerNameComponent implements OnInit {

    public playerNameFormGroup: FormGroup;

    constructor (
        private formBuilder: FormBuilder, public dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) private data: DialogData
    ) {}

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
