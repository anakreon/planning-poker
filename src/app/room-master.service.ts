import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { RoomService, Player } from './room.service';
import { map, switchMap, filter, debounceTime, tap, take } from 'rxjs/operators';
import { PlayerStatusService } from './player-status.service';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoomMasterService {

    constructor (
        private firestoreService: FirestoreService, private roomService: RoomService, private playerStatusService: PlayerStatusService
    ) {}

    public runMasterFunctions (roomId: string) {
        return this.shouldHandleMasterFunctions().pipe(
            filter((shouldHandle: boolean) => shouldHandle),
            switchMap(() => combineLatest(
                this.removeOfflinePlayers(roomId),
                this.assignDifferentModeratorIfNeeded(roomId)
            ))
        );
    }

    private shouldHandleMasterFunctions (): Observable<boolean> {
        return of(true);
    }

    private removeOfflinePlayers (roomId: string): Observable<void[]> {
        return this.roomService.getPlayersInRoom(roomId).pipe(
            switchMap((players: Player[]) => combineLatest(players.map((player: Player) => this.removeOfflinePlayer(roomId, player))))
        );
    }

    private removeOfflinePlayer (roomId: string, player: Player): Observable<void> {
        return this.playerStatusService.getPlayerOnlineStatus(player.id).pipe(
            debounceTime(10000),
            filter((status: string) => !status),
            switchMap(() => this.firestoreService.deleteNestedDocument('rooms', roomId, 'players', player.id))
        );
    }

    private assignDifferentModeratorIfNeeded (roomId: string): Observable<any> {
        return this.roomService.getPlayersInRoom(roomId).pipe(
            filter((players: Player[]) => this.shouldAssignNewModerator(players)),
            switchMap((players: Player[]) => this.assignNewModerator(roomId, players))
        );
    }

    private shouldAssignNewModerator (players: Player[]): boolean {
        return players.length > 0 && players.every((player: Player) => player.role !== 'moderator');
    }

    private assignNewModerator (roomId: string, players: Player[]): Promise<void> {
        const newModerator = players.shift();
        newModerator.role = 'moderator';
        return this.firestoreService.updateNestedDocument('rooms', roomId, 'players', newModerator);
    }
}