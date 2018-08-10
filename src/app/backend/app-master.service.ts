import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { combineLatest, Observable, forkJoin, Observer } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { FirestoreService, FirestoreObject } from '../shared/firestore.service';
import { Constant } from '../shared/constant.service';

@Injectable({
    providedIn: 'root'
})
export class AppMasterService {

    constructor (private firestoreService: FirestoreService, private firebase: AngularFireDatabase, private constant: Constant) {}

    public runMasterFunctions (playerId: string): Observable<any> {
        return this.shouldHandleMasterFunctions(playerId).pipe(
            filter((shouldHandle: boolean) => shouldHandle),
            switchMap(() => combineLatest(
                this.removeEmptyRooms()
            ))
        );
    }

    private shouldHandleMasterFunctions (playerId: string): Observable<boolean> {
        return this.getFirstOnlinePlayerId().pipe(
            map((firstOnlinePlayerId: string) => firstOnlinePlayerId === playerId)
        );
    }

    private getFirstOnlinePlayerId (): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            this.firebase.database.ref(this.constant.collection.status)
                .orderByValue()
                .limitToFirst(1)
                .on('value', (snapshot: firebase.database.DataSnapshot) => {
                    const snapshotValue = snapshot.val();
                    if (snapshotValue) {
                        const masterPlayerId = Object.keys(snapshotValue)[0];
                        observer.next(masterPlayerId);
                    }
                });
        });
    }

    private removeEmptyRooms (): Observable<any> {
        return this.getAllRooms().pipe(
            map((rooms: FirestoreObject[]) => rooms
                .filter((room: FirestoreObject) => this.isOlderThanTenMinutes(room))
                .map((room: FirestoreObject) => room.id)
            ),
            switchMap((roomIds: string[]) => {
                return combineLatest(roomIds.map((roomId: string) => this.removeRoomIfEmpty(roomId)));
            })
        );
    }
    private isOlderThanTenMinutes (room: FirestoreObject): boolean {
        const tenMinutesAgoInSeconds = (Date.now() - 600000) / 1000;
        return room.createdDate.seconds < tenMinutesAgoInSeconds;
    }
    private getAllRooms (): Observable<FirestoreObject[]> {
        return <Observable<FirestoreObject[]>>this.firestoreService.getCollection(this.constant.collection.rooms);
    }
    private removeRoomIfEmpty (roomId: string): Observable<[void, void]> {
        return this.firestoreService.getNestedCollection(this.constant.collection.rooms, roomId, this.constant.collection.players).pipe(
            switchMap((players: FirestoreObject[]) => {
                if (players.length > 0) {
                    return this.deleteRoomAndPlayersIfOffline(roomId, players);
                } else {
                    return this.deleteRoomAndPlayers(roomId);
                }
            })
        );
    }
    private deleteRoomAndPlayersIfOffline (roomId: string, players: FirestoreObject[]): Observable<any> {
        return combineLatest(
                players.map((player: FirestoreObject) => {
                    return this.firebase.object(this.constant.collection.status + '/' + player.id).valueChanges();
                })
            ).pipe(
                filter((playersOnlineStatus: Boolean[]) => playersOnlineStatus.every((onlineStatus: boolean) => !onlineStatus)),
                switchMap(() => this.deleteRoomAndPlayers(roomId))
            );
    }
    private deleteRoomAndPlayers (roomId: string): Observable<any> {
        return forkJoin(
            this.firestoreService.deleteNestedCollection(this.constant.collection.rooms, roomId, this.constant.collection.players),
            this.firestoreService.deleteDocument(this.constant.collection.rooms, roomId),
        );
    }
}
