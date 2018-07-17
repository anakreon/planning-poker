import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { DataSnapshot } from 'angularfire2/database/interfaces';

@Injectable({
    providedIn: 'root'
})
export class PlayerStatusService {

    constructor (private firebase: AngularFireDatabase) {}

    public trackPlayerOnline (playerId: string, roomId: string): void {
        const statusRef = this.firebase.database.ref('status/' + playerId);
        this.firebase.database.ref('.info/connected').on('value', (snapshot: DataSnapshot) => {
            if (snapshot.val() == false) {
                return;
            }
            statusRef.onDisconnect().remove().then(() => {
                statusRef.set(new Date().toISOString());
            });
        });
    }

    public getPlayerOnlineStatus (playerId: string): Observable<boolean> {
        return <Observable<boolean>>this.firebase.object('status/' + playerId).valueChanges();
    }
}
