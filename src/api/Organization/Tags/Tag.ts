import { DMCollection, DMObject } from '@api/Topology/Abstracts';
import {
    CollectionReference,
    DocumentReference,
    DocumentSnapshot,
    FirestoreDataConverter,
    SnapshotOptions,
} from 'firebase/firestore';
import { TagDataReference, TagsDataReference } from './types';

export class Tags extends DMCollection<TagsDataReference> {
    private tags: DocumentReference[];

    constructor(data: TagsDataReference, docRef?: CollectionReference) {
        super(data, docRef);

        this.tags = data.tags;
    }
}

export default class Tag extends DMObject<TagDataReference> {
    private name: string;
    private parent?: DocumentReference;
    private default: boolean;

    constructor(data: TagDataReference, docRef?: DocumentReference) {
        super(data, docRef);

        this.name = data.name;
        this.parent = data.parent;
        this.default = data.default;
    }
}

export const TagConverter: FirestoreDataConverter<Tag> = {
    toFirestore: (tag: Tag) => {
        return tag.getData();
    },
    fromFirestore(snapshot: DocumentSnapshot, options: SnapshotOptions) {
        const data: TagDataReference = snapshot.data(
            options,
        ) as TagDataReference;
        return new Tag(data, snapshot.ref);
    },
};
