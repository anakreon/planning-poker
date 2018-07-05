import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { RoomService, Player } from './room.service';
import { map, switchMap, filter, tap } from 'rxjs/operators';
import { PlayerStatusService } from './player-status.service';
import { combineLatest } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MasterService {

    constructor (
        private firestoreService: FirestoreService, private roomService: RoomService, private playerStatusService: PlayerStatusService
    ) {}

    public removeOfflinePlayers (roomId: string) {
        this.roomService.getPlayersInRoom(roomId).pipe(
            map((players: Player[]) => players.map((player: Player) => player.id)),
            tap((playerIds: string[]) => {
                playerIds.forEach((playerId: string) => this.removeOfflinePlayer(roomId, playerId));
            })
        )
        .subscribe((values) => {
            console.log('values: ', values);
        });
    }

    private removeOfflinePlayer (roomId: string, playerId: string) {
        console.log('trying to remove offline player');
        this.playerStatusService.getPlayerOnlineStatus(playerId).pipe(
            tap((status) => console.log(status, !!status)),
            filter((status: string) => !!status),
            switchMap(() => {
                console.log('deleting: ', roomId, playerId);
                return this.firestoreService.deleteNestedDocument('rooms', roomId, 'players', playerId);
            })
        );
    }
 
}
