import { Injectable } from '@angular/core';
import { FirestoreService, FirestoreObject } from '../firestore.service';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { PlayerStatusService } from '../player-status.service';

export interface Room extends FirestoreObject {
    name: string;
    cardOptions: string[];
    canVote: boolean;
    timerStart: {
        seconds: number;
        nanoseconds: number;
    };
    createdDate: {
        seconds: number;
        nanoseconds: number;
    };
}

export interface Player extends FirestoreObject {
    name: string;
    role: string;
    vote?: string;
}

export interface PlayerWithStatus extends Player {
    status: 'online' | 'offline';
}

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor (private firestoreService: FirestoreService, private playerStatusService: PlayerStatusService) {}

    public createRoom (roomName: string, cardOptions: string[]): Promise<string> {
        const newRoom = {
            id: null,
            name: roomName,
            cardOptions,
            canVote: true,
            timerStart: new Date(),
            createdDate: new Date()
        };
        return this.firestoreService.addDocument('rooms', newRoom);
    }

    public getRoom (roomId: string): Observable<Room> {
        return <Observable<Room>>this.firestoreService.getDocument('rooms', roomId);
    }

    public addPlayerToRoom (roomId: string, playerName: string): Promise<string> {
        return this.confirmRoomExists(roomId)
            .then(() => this.createPlayerRole(roomId))
            .then((role: string) => {
                const newPlayer: Player = {
                    id: null,
                    name: playerName,
                    role
                };
                return this.firestoreService.addNestedDocument('rooms', roomId, 'players', newPlayer).then((playerId: string) => {
                    this.playerStatusService.trackPlayerOnline(playerId, roomId);
                    return playerId;
                });
        });
    }

    private confirmRoomExists (roomId): Promise<Room> {
        return this.getRoom(roomId)
            .pipe(take(1))
            .toPromise();
    }

    private createPlayerRole (roomId: string): Promise<string> {
        return this.getPlayersInRoom(roomId).pipe(take(1)).toPromise().then((players: Player[]) => {
            if (players.length) {
                return 'player';
            } else {
                return 'moderator';
            }
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

    public getPlayer (roomId: string, playerId: string): Observable<Player> {
        return <Observable<Player>>this.firestoreService.getNestedDocument('rooms', roomId, 'players', playerId);
    }

    public changePlayerRole (roomId: string, playerId: string, role: string) {
        const updatedPlayer = {
            id: playerId,
            role
        };
        this.firestoreService.updateNestedDocument('rooms', roomId, 'players', updatedPlayer);
    }

}
