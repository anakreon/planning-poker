import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { RoomService, Player, Room } from './room.service';
import { map, switchMap, filter } from 'rxjs/operators';
import { PlayerStatusService } from './player-status.service';
import { combineLatest, Observable, of, forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppMasterService {

    constructor (
        private firestoreService: FirestoreService, private roomService: RoomService, private playerStatusService: PlayerStatusService
    ) {}

    public runMasterFunctions (): Observable<any> {
        return this.shouldHandleMasterFunctions().pipe(
            filter((shouldHandle: boolean) => shouldHandle),
            switchMap(() => combineLatest(
                this.removeEmptyRooms()
            ))
        );
    }

    private shouldHandleMasterFunctions (): Observable<boolean> {
        return of(true);
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
        return this.roomService.getPlayersInRoom(roomId).pipe(
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
                players.map((player: Player) => this.playerStatusService.getPlayerOnlineStatus(player.id))
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
