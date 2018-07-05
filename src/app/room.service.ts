import { Injectable } from '@angular/core';
import { FirestoreService, FirestoreObject } from './firestore.service';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { PlayerStatusService } from './player-status.service';

export interface Room extends FirestoreObject {
    name: string;
}

export interface Player extends FirestoreObject {
    name: string;
}

export interface PlayerWithStatus extends Player {
    status: 'online' | 'offline';
}

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor (private firestoreService: FirestoreService, private playerStatusService: PlayerStatusService) {}

    public createRoom (roomName: string): Promise<string> {
        const newRoom: Room = {
            id: null,
            name: roomName
        };
        return this.firestoreService.addDocument('rooms', newRoom);
    }

    public getRoom (roomId: string): Observable<Room> {
        return <Observable<Room>>this.firestoreService.getDocument('rooms', roomId);
    }

    public addPlayerToRoom (roomId: string, playerName: string): Promise<string> {
        const newPlayer: Player = {
            id: null,
            name: playerName
        };
        return this.firestoreService.addNestedDocument('rooms', roomId, 'players', newPlayer).then((playerId: string) => {
            this.playerStatusService.trackPlayerOnline(playerId);
            return playerId;
        });
    }

    public getPlayersInRoom (roomId: string): Observable<Player[]> {
        return <Observable<Player[]>>this.firestoreService.getNestedCollection('rooms', roomId, 'players');
    }

    public getPlayersInRoomWithOnlineStatus (roomId: string): Observable<PlayerWithStatus[]> {
        return this.getPlayersInRoom(roomId).pipe(
            switchMap((players: Player[]) => {
                return this.addStatusToPlayers(players);
            })
        );
    }

    private addStatusToPlayers (players: Player[]): Observable<PlayerWithStatus[]> {
        return combineLatest(players.map((player) => this.addStatusToPlayer(player)));
    }

    private addStatusToPlayer (player: Player): Observable<PlayerWithStatus> {
        return this.playerStatusService.getPlayerOnlineStatus(player.id).pipe(
            map((status: string) => {
                const playerWithStatus = {
                    ...player,
                    status: !!status
                };
                return playerWithStatus;
            })
        );
    }

}
