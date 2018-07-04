import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor (private firestoreService: FirestoreService) {}

    public createRoom (roomName: string): Promise<string> {
        const newRoom = {
            id: null,
            name: roomName
        };
        return this.firestoreService.addDocument('rooms', newRoom);
    }
}
