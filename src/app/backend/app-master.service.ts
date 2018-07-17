import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Player, Room } from '../room/room.service';
import { map, switchMap, filter } from 'rxjs/operators';
import { combineLatest, Observable, of, forkJoin, Observer } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
    providedIn: 'root'
})
export class AppMasterService {

    constructor (private firestoreService: FirestoreService, private firebase: AngularFireDatabase) {}

    public runMasterFunctions (playerId: string): Observable<any> {
        return this.shouldHandleMasterFunctions(playerId).pipe(
            filter((shouldHandle: boolean) => shouldHandle),
            switchMap(() => combineLatest(
                this.removeEmptyRooms()
            ))
        );
    }

    private shouldHandleMasterFunctions (playerId: string): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            this.firebase.database.ref('status').orderByValue().limitToFirst(1).on('value', (snapshot: firebase.database.DataSnapshot) => {
                const snapshotValue = snapshot.val();
                if (snapshotValue) {
                    const masterPlayerId = Object.keys(snapshot.val())[0];
                    observer.next(playerId === masterPlayerId);
                }
            });
        });
    }

    private removeEmptyRooms (): Observable<any> {
        return this.getAllRooms().pipe(
            map((rooms: Room[]) => rooms
                .filter((room: Room) => this.isOlderThanTenMinutes(room))
                .map((room: Room) => room.id)
            ),
            switchMap((roomIds: string[]) => {
                return combineLatest(roomIds.map((roomId: string) => this.removeRoomIfEmpty(roomId)));
            })
        );
    }
    private isOlderThanTenMinutes (room: Room): boolean {
        const tenMinutesAgoInSeconds = (Date.now() - 600000) / 1000;
        return room.createdDate.seconds < tenMinutesAgoInSeconds;
    }
    private getAllRooms (): Observable<Room[]> {
        return <Observable<Room[]>>this.firestoreService.getCollection('rooms');
    }
    private removeRoomIfEmpty (roomId: string): Observable<[void, void]> {
        return this.firestoreService.getNestedCollection('rooms', roomId, 'players').pipe(
            switchMap((players: Player[]) => {
                if (players.length > 0) {
                    return this.deleteRoomAndPlayersIfOffline(roomId, players);
                } else {
                    return this.deleteRoomAndPlayers(roomId);
                }
            })
        );
    }
    private deleteRoomAndPlayersIfOffline (roomId: string, players: Player[]): Observable<any> {
        return combineLatest(
                players.map((player: Player) => this.firebase.object('status/' + player.id).valueChanges())
            ).pipe(
                filter((playersOnlineStatus: Boolean[]) => playersOnlineStatus.every((onlineStatus: boolean) => !onlineStatus)),
                switchMap(() => this.deleteRoomAndPlayers(roomId))
            );
    }
    private deleteRoomAndPlayers (roomId: string): Observable<any> {
        return forkJoin(
            this.firestoreService.deleteNestedCollection('rooms', roomId, 'players'),
            this.firestoreService.deleteDocument('rooms', roomId),
        );
    }
}
