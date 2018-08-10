import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap, filter, debounceTime } from 'rxjs/operators';
import { FirestoreService, FirestoreObject } from '../shared/firestore.service';
import { Constant } from '../shared/constant.service';

@Injectable({
    providedIn: 'root'
})
export class RoomMasterService {

    constructor (private firestoreService: FirestoreService, private firebase: AngularFireDatabase, private constant: Constant) {}

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
            switchMap((players: FirestoreObject[]) => {
                return combineLatest(players.map((player: FirestoreObject) => this.removeOfflinePlayer(roomId, player)));
            })
        );
    }

    private removeOfflinePlayer (roomId: string, player: FirestoreObject): Observable<void> {
        return this.getPlayerOnlineStatus(player.id).pipe(
            debounceTime(this.getDebounceTime(player)),
            filter((status: string) => !status),
            switchMap(() => {
                return this.firestoreService.deleteNestedDocument(
                    this.constant.collection.rooms, roomId, this.constant.collection.players, player.id);
            })
        );
    }

    private getDebounceTime (player: FirestoreObject): number {
        const tenSeconds = 10000;
        const tenMinutes = 600000;
        return player.role === this.constant.playerRole.moderator ? tenSeconds : tenMinutes;
    }

    private getPlayerOnlineStatus (playerId: string): Observable<boolean> {
        return <Observable<boolean>>this.firebase.object(this.constant.collection.status + '/' + playerId).valueChanges();
    }

    private assignDifferentModeratorIfNeeded (roomId: string): Observable<any> {
        return this.getPlayersInRoom(roomId).pipe(
            filter((players: FirestoreObject[]) => this.shouldAssignNewModerator(players)),
            switchMap((players: FirestoreObject[]) => this.assignNewModerator(roomId, players))
        );
    }

    private shouldAssignNewModerator (players: FirestoreObject[]): boolean {
        return players.length > 0 && players.every((player: FirestoreObject) => player.role !== this.constant.playerRole.moderator);
    }

    private assignNewModerator (roomId: string, players: FirestoreObject[]): Promise<void> {
        const newModerator = players.shift();
        newModerator.role = this.constant.playerRole.moderator;
        return this.firestoreService.updateNestedDocument(
            this.constant.collection.rooms, roomId, this.constant.collection.players, newModerator);
    }
    private getPlayersInRoom (roomId: string): Observable<FirestoreObject[]> {
        return <Observable<FirestoreObject[]>>this.firestoreService.getNestedCollection(
            this.constant.collection.rooms, roomId, this.constant.collection.players);
    }
}