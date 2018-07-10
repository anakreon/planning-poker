import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../room.service';
import { RoomService } from '../../room.service';
import { MatDialog } from '@angular/material';
import { PlayerNameDialogComponent } from '../player-name-dialog/player-name-dialog.component';
import { RoomMasterService } from '../../room-master.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
    public room: Room;
    public playerName: string;
    public playerId: string;

    private masterFunctionsSubscription: Subscription;

    constructor (
        private route: ActivatedRoute, private roomService: RoomService, public dialog: MatDialog, private router: Router,
        private roomMasterService: RoomMasterService
    ) {}

    ngOnInit () {
        this.room = this.route.snapshot.data.room;
        this.getPlayerName().then((playerName: string) => {
            this.playerName = playerName;
            this.addPlayerToRoom(playerName)
                .then((playerId: string) => {
                    this.playerId = playerId;
                })
                .catch((error) => {
                    console.log(error);
                    this.router.navigate(['/dashboard/']);
                });
        });
        this.masterFunctionsSubscription = this.roomMasterService.runMasterFunctions(this.room.id).subscribe((didMaintenance) => {
            console.log('cleaned players: ', didMaintenance);
        });
    }

    ngOnDestroy () {
        this.masterFunctionsSubscription.unsubscribe();;
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

}
