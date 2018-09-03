import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-dialog-evicted-from-room',
    templateUrl: './dialog-evicted-from-room.component.html',
    styleUrls: ['./dialog-evicted-from-room.component.css']
})
export class DialogEvictedFromRoomComponent {

    constructor (public dialogRef: MatDialogRef<void>) {}

    public closeDialog (): void {
        this.dialogRef.close();
    }
}
