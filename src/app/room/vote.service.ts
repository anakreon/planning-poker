import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreService, FirestoreObject } from '../shared/firestore.service';
import { Constant } from '../shared/constant.service';

@Injectable({
    providedIn: 'root'
})
export class VoteService {

    constructor (private firestoreService: FirestoreService, private constant: Constant) {}

    public vote (roomId: string, playerId: string, value: string): Promise<void> {
        return this.firestoreService.updateNestedDocument(this.constant.collection.rooms, roomId, this.constant.collection.players, {
            id: playerId,
            vote: value
        });
    }

    public getVotedValue (roomId: string, playerId: string): Observable<string> {
        return this.firestoreService.getNestedDocument(
                this.constant.collection.rooms, roomId, this.constant.collection.players, playerId)
            .pipe(
                map((player: FirestoreObject) => player.vote)
            );
    }
}
