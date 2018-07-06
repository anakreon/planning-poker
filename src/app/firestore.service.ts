import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, Action, DocumentSnapshot, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FirestoreObject {
    id: string;
    [index: string]: any;
}

type ReferenceRoot = AngularFirestore | AngularFirestoreDocument;

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    constructor (private firestore: AngularFirestore) {}

    public getCollection (collectionName: string): Observable<FirestoreObject[]> {
        return this.getCollectionForReferenceRoot(this.firestore, collectionName);
    }

    public getNestedCollection (parentCollectionName: string, parentDocumentId: string, collectionName: string): Observable<FirestoreObject[]> {
        const parentDocument = this.getDocumentReference(this.firestore, parentCollectionName, parentDocumentId);
        return this.getCollectionForReferenceRoot(parentDocument, collectionName);
    }

    private getCollectionForReferenceRoot (referenceRoot: ReferenceRoot, collectionName: string): Observable<FirestoreObject[]> {
        return referenceRoot.collection(collectionName).snapshotChanges().pipe(
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
        return this.getDocumentForReferenceRoot(this.firestore, collectionName, documentId);
    }

    public getNestedDocument (parentCollectionName: string, parentDocumentId: string, collectionName: string, documentId: string): Observable<FirestoreObject> {
        const parentDocument = this.getDocumentReference(this.firestore, parentCollectionName, parentDocumentId);
        return this.getDocumentForReferenceRoot(parentDocument, collectionName, documentId);
    }

    private getDocumentForReferenceRoot (referenceRoot: ReferenceRoot, collectionName: string, documentId: string): Observable<FirestoreObject> {
        const document = this.getDocumentReference(referenceRoot, collectionName, documentId);
        return document.snapshotChanges().pipe(
            map((value: Action<DocumentSnapshot<{}>>) => {
                if (!value.payload.exists) {
                    throw new Error('Document not found');
                }
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
        return this.deleteDocumentForReferenceRoot(this.firestore, collectionName, documentId);
    }

    public deleteNestedDocument (parentCollectionName: string, parentDocumentId: string, collectionName: string, documentId: string): Promise<void> {
        const parentDocument = this.getDocumentReference(this.firestore, parentCollectionName, parentDocumentId);
        return this.deleteDocumentForReferenceRoot(parentDocument, collectionName, documentId);
    }

    private deleteDocumentForReferenceRoot (referenceRoot: ReferenceRoot, collectionName: string, documentId: string) {
        const document = this.getDocumentReference(referenceRoot, collectionName, documentId);
        return document.delete();
    }

    private getDocumentReference (referenceRoot: ReferenceRoot, collectionName: string, documentId: string): AngularFirestoreDocument<{}> {
        return referenceRoot.collection(collectionName).doc(documentId);
    }

    public addDocument (collectionName: string, document: FirestoreObject): Promise<string>  {
        document.id = this.firestore.createId();
        return this.storeDocument(collectionName, document).then(() => document.id);
    }

    public updateDocument (collectionName: string, document: FirestoreObject): Promise<void> {
        return this.storeDocument(collectionName, document);
    }

    private storeDocument (collectionName: string, document: FirestoreObject): Promise<void> {
        return this.storeDocumentForReferenceRoot(this.firestore, collectionName, document);
    }

    public addNestedDocument (parentCollectionName: string, parentDocumentId: string, collectionName: string, document: FirestoreObject): Promise<string> {
        document.id = this.firestore.createId();
        return this.storeNestedDocument(parentCollectionName, parentDocumentId, collectionName, document).then(() => document.id);
    }

    public updateNestedDocument (parentCollectionName: string, parentDocumentId: string, collectionName: string, document: FirestoreObject): Promise<void> {
        return this.storeNestedDocument(parentCollectionName, parentDocumentId, collectionName, document);
    }

    private storeNestedDocument (parentCollectionName: string, parentDocumentId: string, collectionName: string, document: FirestoreObject): Promise<void> {
        const parentDocument = this.getDocumentReference(this.firestore, parentCollectionName, parentDocumentId);
        return this.storeDocumentForReferenceRoot(parentDocument, collectionName, document);
    }

    private storeDocumentForReferenceRoot (referenceRoot: ReferenceRoot, collectionName: string, document: FirestoreObject) {
        const { id, ...documentWithoutId } = document;
        const documentRef = this.getDocumentReference(referenceRoot, collectionName, id);
        return documentRef.set(documentWithoutId);
    }

}
