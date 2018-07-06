import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { RoomService, Player } from './room.service';
import { map, switchMap, filter, debounceTime } from 'rxjs/operators';
import { PlayerStatusService } from './player-status.service';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MasterService {

    constructor (
        private firestoreService: FirestoreService, private roomService: RoomService, private playerStatusService: PlayerStatusService
    ) {}

    public runMasterFunctions (roomId: string) {
        return this.shouldHandleMasterFunctions().pipe(
            filter((shouldHandle: boolean) => shouldHandle),
            switchMap((shouldHandle: boolean) => {
                return combineLatest(
                    this.removeOfflinePlayers(roomId)
                );
            })
        );
    }

    private shouldHandleMasterFunctions (): Observable<boolean> {
        return of(true);
    }

    private removeOfflinePlayers (roomId: string): Observable<void[]> {
        return this.roomService.getPlayersInRoom(roomId).pipe(
            map((players: Player[]) => players.map((player: Player) => player.id)),
            switchMap((playerIds: string[]) => {
                return combineLatest(playerIds.map((playerId: string) => this.removeOfflinePlayer(roomId, playerId)))
            })
        );
    }

    private removeOfflinePlayer (roomId: string, playerId: string): Observable<void> {
        return this.playerStatusService.getPlayerOnlineStatus(playerId).pipe(
            debounceTime(1000),
            filter((status: string) => !status),
            switchMap(() => {
                return this.firestoreService.deleteNestedDocument('rooms', roomId, 'players', playerId);
            })
        );
    }
}
