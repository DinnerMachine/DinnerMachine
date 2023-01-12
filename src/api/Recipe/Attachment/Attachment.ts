import { DMCollection, DMObject } from '@api/Topology/Abstracts';
import {
    CollectionReference,
    DocumentReference,
    DocumentSnapshot,
    FirestoreDataConverter,
    SnapshotOptions,
} from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';
import { AttachmentDataReference, AttachmentsDataReference } from './types';

export class Attachments extends DMCollection<AttachmentsDataReference> {
    private attachments: StorageReference[];

    constructor(data: AttachmentsDataReference, docRef?: CollectionReference) {
        super(data, docRef);

        this.attachments = data.attachments;
    }
}

export default class Attachment extends DMObject<AttachmentDataReference> {
    private name: string;
    private location: StorageReference;
    private attachmentType: string;

    constructor(data: AttachmentDataReference, docRef?: DocumentReference) {
        super(data, docRef);

        this.name = data.name;
        this.location = data.location;
        this.attachmentType = data.attachmentType;
    }
}

export const AttachmentConverter: FirestoreDataConverter<Attachment> = {
    toFirestore: (attachment: Attachment) => {
        return attachment.getData();
    },
    fromFirestore(snapshot: DocumentSnapshot, options: SnapshotOptions) {
        const data: AttachmentDataReference = snapshot.data(
            options,
        ) as AttachmentDataReference;
        return new Attachment(data, snapshot.ref);
    },
};
