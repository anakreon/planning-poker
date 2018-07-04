import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, Action, DocumentSnapshot } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface FirestoreObject {
    id: string;
    [index: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor (private firestore: AngularFirestore) {}

    public getCollection (name: string): Observable<FirestoreObject[]> {
        return this.firestore.collection(name).snapshotChanges().pipe(
            map((values: DocumentChangeAction<{}>[]) => {
                return values.map(this.buildObjectForChangeAction);
            })
        );
    }
    private buildObjectForChangeAction (dca: DocumentChangeAction<{}>): FirestoreObject {
        const data = dca.payload.doc.data() as FirestoreObject;
        const id = dca.payload.doc.id;
        return { id, ...data };
    }

    public getDocument (collectionName: string, documentId: string): Observable<FirestoreObject> {
        return this.firestore.doc(collectionName + '/' + documentId).snapshotChanges().pipe(
            map((value: Action<DocumentSnapshot<{}>>) => {
                return this.buildObjectForSnapshot(value);
            })
        );
    }
    private buildObjectForSnapshot (dca: Action<DocumentSnapshot<{}>>): FirestoreObject {
        const data = dca.payload.data() as FirestoreObject;
        const id = dca.payload.id;
        return { id, ...data };
    }

    public deleteDocument (collectionName: string, documentId: string): Promise<void> {
        return this.firestore.doc(collectionName + '/' + documentId).delete();
    }

    public addDocument (collectionName: string, document: FirestoreObject): Promise<string>  {
        document.id = this.firestore.createId();
        return this.storeDocument(collectionName, document).then(() => document.id);
    }

    public updateDocument (collectionName: string, document: FirestoreObject): Promise<void> {
        return this.storeDocument(collectionName, document);
    }

    private storeDocument (collectionName: string, document: FirestoreObject): Promise<void> {
        const { id, ...documentWithoutId } = document;
        const itemsCollection = this.firestore.collection<FirestoreObject>(collectionName);
        return itemsCollection.doc(id).set(documentWithoutId);
    }
}
