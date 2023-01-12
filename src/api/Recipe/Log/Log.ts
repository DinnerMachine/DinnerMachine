import {
    CollectionReference,
    DocumentReference,
    DocumentSnapshot,
    FirestoreDataConverter,
    SnapshotOptions,
} from 'firebase/firestore';
import { DMCollection, DMObject } from '../../Topology/Abstracts';
import { NotesDataReference } from '../Note/types';
import { RecipeUser } from '../Recipe';
import { LogDataReference, LogsDataReference } from './types';

export class Logs extends DMCollection<LogsDataReference> {
    private logs: DocumentReference[];

    constructor(data: LogsDataReference, docRef?: CollectionReference) {
        super(data, docRef);

        this.logs = data.directions;
    }
}

export default class Log extends DMObject<LogDataReference> {
    private name: string;
    private notes: NotesDataReference;
    private rating?: number;
    private prepTime?: number;
    private cookTime?: number;
    private factor: number;
    private category: DocumentReference;
    private recipe?: DocumentReference;
    private timeEaten: Date;
    private timeRecorded: Date;

    constructor(data: LogDataReference, docRef?: DocumentReference) {
        super(data, docRef);

        this.name = data.name;
        this.notes = data.notes;
        this.rating = data.rating;
        this.prepTime = data.prepTime;
        this.cookTime = data.cookTime;
        this.factor = data.factor;
        this.category = data.category;
        this.recipe = data.recipe;
        this.timeEaten = data.timeEaten;
        this.timeRecorded = data.timeRecorded;
    }
}

export const LogConverter: FirestoreDataConverter<Log> = {
    toFirestore: (log: Log) => {
        return log.getData();
    },
    fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
        const data: LogDataReference = snapshot.data(
            options,
        ) as LogDataReference;
        return new Log(data, snapshot.ref);
    },
};
