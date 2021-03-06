import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { FirestoreService, FirestoreObject } from '../shared/firestore.service';
import { PlayerStatusService } from '../shared/player-status.service';
import { Constant } from '../shared/constant.service';
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

    constructor (
        private firestoreService: FirestoreService, private playerStatusService: PlayerStatusService, private constant: Constant
    ) {}

    public createRoom (roomName: string, cardOptions: string[]): Promise<string> {
        const newRoom = {
            id: null,
            name: roomName,
            cardOptions,
            canVote: true,
            timerStart: new Date(),
            createdDate: new Date()
        };
        return this.firestoreService.addDocument(this.constant.collection.rooms, newRoom);
    }

    public getRoom (roomId: string): Observable<Room> {
        return <Observable<Room>>this.firestoreService.getDocument(this.constant.collection.rooms, roomId);
    }

    public addPlayerToRoom (roomId: string, player: Player): Promise<string> {
        return this.firestoreService.addNestedDocument(this.constant.collection.rooms, roomId, this.constant.collection.players, player)
            .then((playerId: string) => {
                return playerId;
            });
    }

    public removePlayerFromRoom (roomId: string, playerId: string): Promise<void> {
        return this.firestoreService.deleteNestedDocument(
            this.constant.collection.rooms, roomId, this.constant.collection.players, playerId
        );
    }

    public createNewPlayerForRoom (roomId: string, playerName: string): Promise<Player> {
        return this.confirmRoomExists(roomId).then(() => {
            return this.createPlayerRole(roomId).then((role: string) => {
                return {
                    id: null,
                    name: playerName,
                    role
                };
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
                return this.constant.playerRole.player;
            } else {
                return this.constant.playerRole.moderator;
            }
        });
    }

    public getPlayersInRoom (roomId: string): Observable<Player[]> {
        return <Observable<Player[]>>this.firestoreService.getNestedCollection(
            this.constant.collection.rooms, roomId, this.constant.collection.players);
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
        return <Observable<Player>>this.firestoreService.getNestedDocument(
            this.constant.collection.rooms, roomId, this.constant.collection.players, playerId);
    }

    public changePlayerRole (roomId: string, playerId: string, role: string) {
        const updatedPlayer = {
            id: playerId,
            role
        };
        this.firestoreService.updateNestedDocument(this.constant.collection.rooms, roomId, this.constant.collection.players, updatedPlayer);
    }

    public flipCards (roomId: string): Promise<void> {
        const updatedRoom = {
            id: roomId,
            canVote: false,
            timerStart: null
        };
        return this.firestoreService.updateDocument(this.constant.collection.rooms, updatedRoom);
    }

    public newVote (roomId: string): Promise<void> {
        return this.resetPlayerVotes(roomId).then(() => {
            const updatedRoom = {
                id: roomId,
                canVote: true,
                timerStart: new Date()
            };
            return this.firestoreService.updateDocument(this.constant.collection.rooms, updatedRoom);
        });
    }
    private resetPlayerVotes (roomId: string): Promise<void[]> {
        return this.getPlayersInRoom(roomId).pipe(take(1)).toPromise().then((players: Player[]) => {
            return Promise.all(players.map((player: Player) => {
                const updatedPlayer = {
                    id: player.id,
                    vote: null
                };
                return this.firestoreService.updateNestedDocument(
                    this.constant.collection.rooms, roomId, this.constant.collection.players, updatedPlayer);
            }));
        });
    }

    public resetTimer (roomId: string): Promise<void> {
        const updatedRoom = {
            id: roomId,
            timerStart: new Date()
        };
        return this.firestoreService.updateDocument(this.constant.collection.rooms, updatedRoom);
    }

}
