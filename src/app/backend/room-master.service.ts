import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Player } from '../room/room.service';
import { switchMap, filter, debounceTime } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
    providedIn: 'root'
})
export class RoomMasterService {

    constructor (private firestoreService: FirestoreService, private firebase: AngularFireDatabase) {}

    public runMasterFunctions (playerId: string, roomId: string) {
        return this.shouldHandleMasterFunctions(playerId, roomId).pipe(
            filter((shouldHandle: boolean) => shouldHandle),
            switchMap(() => combineLatest(
                this.removeOfflinePlayers(roomId),
                this.assignDifferentModeratorIfNeeded(roomId)
            ))
        );
    }

    private shouldHandleMasterFunctions (playerId: string, roomId: string): Observable<boolean> {
        return of(true);
    }

    private removeOfflinePlayers (roomId: string): Observable<void[]> {
        return this.getPlayersInRoom(roomId).pipe(
            switchMap((players: Player[]) => combineLatest(players.map((player: Player) => this.removeOfflinePlayer(roomId, player))))
        );
    }

    private removeOfflinePlayer (roomId: string, player: Player): Observable<void> {
        return this.getPlayerOnlineStatus(player.id).pipe(
            debounceTime(10000),
            filter((status: string) => !status),
            switchMap(() => this.firestoreService.deleteNestedDocument('rooms', roomId, 'players', player.id))
        );
    }

    private getPlayerOnlineStatus (playerId: string): Observable<boolean> {
        return <Observable<boolean>>this.firebase.object('status/' + playerId).valueChanges();
    }

    private assignDifferentModeratorIfNeeded (roomId: string): Observable<any> {
        return this.getPlayersInRoom(roomId).pipe(
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
    private getPlayersInRoom (roomId: string): Observable<Player[]> {
        return <Observable<Player[]>>this.firestoreService.getNestedCollection('rooms', roomId, 'players');
    }
}