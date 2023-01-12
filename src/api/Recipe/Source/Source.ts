import { DMCollection, DMObject } from '@api/Topology/Abstracts';
import {
    CollectionReference,
    DocumentReference,
    DocumentSnapshot,
    FirestoreDataConverter,
    SnapshotOptions,
} from 'firebase/firestore';
import { SourceDataReference, SourcesDataReference } from './types';

export class Sources extends DMCollection<SourcesDataReference> {
    private sources: DocumentReference[];

    constructor(
        data: SourcesDataReference,
        collectionRef?: CollectionReference,
    ) {
        super(data, collectionRef);

        this.sources = data.sources;
    }
}

export default class Source extends DMObject<SourceDataReference> {
    private name: string;
    private url: string;
    private lastUpdated: Date;

    constructor(data: SourceDataReference, docRef?: DocumentReference) {
        super(data, docRef);

        this.name = data.name;
        this.url = data.url;
        this.lastUpdated = data.lastUpdated;
    }
}

export const SourceConverter: FirestoreDataConverter<Source> = {
    toFirestore: (source: Source) => {
        return source.getData();
    },
    fromFirestore(snapshot: DocumentSnapshot, options: SnapshotOptions) {
        const data: SourceDataReference = snapshot.data(
            options,
        ) as SourceDataReference;
        return new Source(data, snapshot.ref);
    },
};
