import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { Player } from './room/room.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class VoteService {

    constructor (private firestoreService: FirestoreService) {}

    public vote (roomId: string, playerId: string, value: string): Promise<void> {
        return this.firestoreService.updateNestedDocument('rooms', roomId, 'players', {
            id: playerId,
            vote: value
        });
    }

    public getVotedValue (roomId: string, playerId: string): Observable<string> {
        return this.firestoreService.getNestedDocument('rooms', roomId, 'players', playerId).pipe(
            map((player: Player) => player.vote)
        );
    }
}
