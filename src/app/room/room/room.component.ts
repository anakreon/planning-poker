import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService, Room } from '../../room/room.service';
import { MatDialog } from '@angular/material';
import { PlayerNameDialogComponent } from '../player-name-dialog/player-name-dialog.component';
import { RoomMasterService } from '../../backend/room-master.service';
import { Subscription } from 'rxjs';
import { AppMasterService } from '../../backend/app-master.service';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
    public room: Room;
    public playerName: string;
    public playerId: string;

    private appMasterSubscription: Subscription;
    private roomMasterSubscription: Subscription;

    constructor (
        private route: ActivatedRoute, private roomService: RoomService, public dialog: MatDialog, private router: Router,
        private appMasterService: AppMasterService, private roomMasterService: RoomMasterService
    ) {}

    ngOnInit () {
        this.room = this.route.snapshot.data.room;
        this.getPlayerName().then((playerName: string) => {
            this.playerName = playerName;
            this.addPlayerToRoom(playerName)
                .then((playerId: string) => {
                    this.playerId = playerId;
                    this.registerBackendServices(playerId);
                })
                .catch((error) => {
                    console.log(error);
                    this.router.navigate(['/dashboard/']);
                });
        });
    }

    ngOnDestroy () {
        if (this.appMasterSubscription) {
            this.appMasterSubscription.unsubscribe();
        }
        if (this.roomMasterSubscription) {
            this.roomMasterSubscription.unsubscribe();
        }
    }

    private registerBackendServices (playerId: string): void {
        this.appMasterSubscription = this.appMasterService.runMasterFunctions(playerId)
            .subscribe((results) => {
                console.log('app master results: ', results);
            });
        this.roomMasterSubscription = this.roomMasterService.runMasterFunctions(playerId, this.room.id)
            .subscribe((didMaintenance) => {
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

}
