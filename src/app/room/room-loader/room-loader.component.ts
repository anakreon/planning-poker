import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService, Room, Player } from '../../room/room.service';
import { MatDialog } from '@angular/material';
import { PlayerNameDialogComponent } from '../player-name-dialog/player-name-dialog.component';
import { RoomMasterService } from '../../backend/room-master.service';
import { Subscription, Observable } from 'rxjs';
import { AppMasterService } from '../../backend/app-master.service';
import { PlayerSessionService } from '../../player-session.service';
import { PlayerStatusService } from '../../player-status.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-room-loader',
    templateUrl: './room-loader.component.html',
    styleUrls: ['./room-loader.component.scss']
})
export class RoomLoaderComponent implements OnInit, OnDestroy {
    public room: Room;
    public playerId: string;
    public isCurrentPlayerObserver: Observable<boolean>;

    private appMasterSubscription: Subscription;
    private roomMasterSubscription: Subscription;
    private playerOnlineSubscription: Subscription;

    constructor (
        private route: ActivatedRoute, private roomService: RoomService, private playerSessionService: PlayerSessionService,
        private playerStatusService: PlayerStatusService, private dialog: MatDialog, private router: Router, 
        private appMasterService: AppMasterService, private roomMasterService: RoomMasterService
    ) {}

    async ngOnInit () {
        this.room = this.route.snapshot.data.room;
        try {
            const player = await this.getCurrentPlayer();
            this.playerId = player.id;
            this.registerSubscriptions(player.id);
        } catch (error) {
            console.log(error);
            this.router.navigate(['/dashboard/']);
        }
    }

    ngOnDestroy () {
        if (this.appMasterSubscription) {
            this.appMasterSubscription.unsubscribe();
        }
        if (this.roomMasterSubscription) {
            this.roomMasterSubscription.unsubscribe();
        }
        if (this.playerOnlineSubscription) {
            this.playerOnlineSubscription.unsubscribe();
        }
    }

    private registerSubscriptions (playerId: string): void {
        this.appMasterSubscription = this.appMasterService.runMasterFunctions(playerId)
            .subscribe((results) => {
                console.log('app master results: ', results);
            });
        this.roomMasterSubscription = this.roomMasterService.runMasterFunctions(playerId, this.room.id)
            .subscribe((didMaintenance) => {
                console.log('room master results: ', didMaintenance);
            });

        this.playerOnlineSubscription = this.playerStatusService.getPlayerOnlineStatus(playerId)
            .pipe(
                filter((status: boolean) => !status)
            )
            .subscribe(() => this.playerStatusService.trackPlayerOnline(playerId));
    }

    private async getCurrentPlayer (): Promise<Player> {
        const playerFromSession = await this.playerSessionService.restorePlayerFromSession(this.room.id);
        if (playerFromSession) {
            return playerFromSession;
        } else {
            const playerName = await this.askForPlayerName();
            const newPlayer = await this.roomService.createNewPlayerForRoom(this.room.id, playerName);
            newPlayer.id = await this.roomService.addPlayerToRoom(this.room.id, newPlayer);
            this.playerSessionService.setPlayerForRoom(this.room.id, newPlayer);
            return newPlayer;
        }
    }

    private askForPlayerName (): Promise<string> {
        const defaultPlayerName = this.playerSessionService.getDefaultPlayerName();
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                this.getPlayerNameFromDialog(defaultPlayerName).then((playerName: string) => {
                    this.playerSessionService.setDefaultPlayerName(playerName);
                    resolve(playerName);
                }, reject);
            });
        });
    }

    private getPlayerNameFromDialog (defaultPlayerName: string) {
        const dialogRef = this.dialog.open(PlayerNameDialogComponent, {
            height: '260px',
            width: '275px',
            data: { defaultPlayerName }
        });
        return dialogRef.afterClosed().toPromise();
    }

}
