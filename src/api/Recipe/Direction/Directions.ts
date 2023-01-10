import { db } from '@api/Firebase/init';
import {
    CollectionReference,
    doc,
    DocumentReference,
    getDoc,
} from 'firebase/firestore';
import { DMCollection, DMObject } from '../../Topology/Abstracts';
import { DirectionIngredient } from '../Ingredient/Ingredient';
import { DirectionData } from '../types';

export default class Directions extends DMCollection {
    private directionGroups: DocumentReference[];
    constructor(
        directionGroups: DocumentReference[] | DirectionGroup[],
        collectionRef?: CollectionReference | null,
    ) {
        super();
        this.directionGroups = directionGroups;
    }

    async getDirectionGroups(): Promise<DirectionGroup[]> {
        var directionGroups: DirectionGroup[] = [];
        for (var docRef of this.directionGroups) {
            var doc = await getDoc(docRef);
            directionGroups.push(new DirectionGroup(doc, docRef));
        }
        return directionGroups;
    }
}

export class DirectionGroup extends DMObject<DirectionGroupData> {
    private directions: Direction[];
    private name: string;

    constructor(data: DirectionGroupData, docRef?: DocumentReference | null) {
        super(data, docRef);
        this.directions = data.directions;
        this.name = data.name;
    }
    getDirections(): Direction[] {
        return this.directions;
    }
}

export class Direction extends DMObject<DirectionData> {
    private content: (String | DirectionIngredient)[];
    private index: number;

    constructor(data: DirectionData, docRef?: DocumentReference | null) {
        super(data, docRef);

        this.content = data.content;
        this.index = data.index;
    }
}
