import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { FirestoreService, FirestoreObject } from './firestore.service';

@Injectable({
    providedIn: 'root'
})
export class PlayerSessionService {
    private readonly defaultPlayerNameStorageKey = 'defaultPlayerName';

    constructor (private firestoreService: FirestoreService) {}

    public getPlayerIdFromSession (roomId: string): Promise<string> {
        const playerId = sessionStorage.getItem(roomId);
        return this.isValidId(roomId, playerId)
            .then(() => playerId)
            .catch(() => Promise.resolve(null));
    }

    private isValidId (roomId: string, playerId: string): Promise<FirestoreObject> {
        if (playerId) {
            return this.firestoreService.getNestedDocument('rooms', roomId, 'players', playerId).pipe(take(1)).toPromise();
        } else {
            return Promise.reject(null);
        }
    }

    public storePlayerSessionForRoom (roomId: string, playerId: string): void {
        sessionStorage.setItem(roomId, playerId);
    }

    public getDefaultPlayerName () {
        return localStorage.getItem(this.defaultPlayerNameStorageKey);
    }

    public setDefaultPlayerName (playerName: string) {
        localStorage.setItem(this.defaultPlayerNameStorageKey, playerName);
    }
}
