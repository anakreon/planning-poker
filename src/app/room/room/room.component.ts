import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../../room.service';
import { RoomService } from '../../room.service';
import { MatDialog } from '@angular/material';
import { PlayerNameDialogComponent } from '../player-name-dialog/player-name-dialog.component';
import { MasterService } from '../../master.service';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    public room: Room;
    public playerName: string;
    public playerId: string;

    constructor (
        private route: ActivatedRoute, private roomService: RoomService, public dialog: MatDialog, private masterService: MasterService
    ) {}

    ngOnInit () {
        this.room = this.route.snapshot.data.room;
        this.getPlayerName().then((playerName: string) => {
            this.playerName = playerName;
            this.addPlayerToRoom(playerName).then((playerId: string) => {
                this.playerId = playerId;
            });
        });
        this.masterService.runMasterFunctions(this.room.id).subscribe((didMaintenance) => {
            console.log('cleaned players: ', didMaintenance);
        });
    }

    private getPlayerName (): Promise<string> {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                this.getPlayerNameFromDialog().then(resolve, reject);
            });
        });
    }

    private addPlayerToRoom (playerName: string): Promise<string> {
        return this.roomService.addPlayerToRoom(this.room.id, playerName);
    }

    private getPlayerNameFromDialog () {
        const dialogRef = this.dialog.open(PlayerNameDialogComponent, {
            height: '260px',
            width: '275px',
        });
        return dialogRef.afterClosed().toPromise();
    }

    /*

    public cardOptions: number[] = [1, 2, 3, 5, 8, 13, 21, 34];

    public selectedCardValue: number = null;

    public selectCardValue (value: number): void {
        this.selectedCardValue = value;
    }*/

}
