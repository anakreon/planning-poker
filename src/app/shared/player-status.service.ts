import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { DataSnapshot } from 'angularfire2/database/interfaces';
import { Constant } from './constant.service';

@Injectable({
    providedIn: 'root'
})
export class PlayerStatusService {

    constructor (private firebase: AngularFireDatabase, private constant: Constant) {}

    public trackPlayerOnlineStatus (playerId: string): void {
        const statusRef = this.firebase.database.ref(this.constant.collection.status + '/' + playerId);
        this.firebase.database.ref('.info/connected').on('value', (snapshot: DataSnapshot) => {
            if (snapshot.val()) {
                const currentDate = new Date().toISOString();
                statusRef.onDisconnect().remove().then(() => statusRef.set(currentDate));
            }
        });
    }

    public getPlayerOnlineStatus (playerId: string): Observable<boolean> {
        return <Observable<boolean>>this.firebase.object(this.constant.collection.status + '/' + playerId).valueChanges();
    }
}
