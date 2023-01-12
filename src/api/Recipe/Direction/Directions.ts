import { db } from '@api/Firebase/init';
import {
    CollectionReference,
    doc,
    DocumentReference,
    getDoc,
} from 'firebase/firestore';
import { DMCollection, DMObject } from '../../Topology/Abstracts';
import { DirectionIngredient } from '../Ingredient/Ingredient';
import {
    DirectionIngredientDataReference,
    IngredientsDataReference,
} from '../Ingredient/types';
import {
    DirectionDataReference,
    DirectionGroupDataReference,
    DirectionsDataReference,
} from './types';

export default class Directions extends DMCollection<DirectionsDataReference> {
    private directions: DocumentReference[];

    constructor(
        data: DirectionsDataReference,
        collectionRef?: CollectionReference,
    ) {
        super(data, collectionRef);
        this.directions = data.directions;
    }

    async getDirectionGroups(): Promise<DirectionGroup[]> {
        var directionGroups: DirectionGroup[] = [];
        for (var docRef of this.directions) {
            var doc = await getDoc(docRef);
            directionGroups.push(new DirectionGroup(doc, docRef));
        }
        return directionGroups;
    }
}

export class DirectionGroup extends DMObject<DirectionGroupDataReference> {
    private directions: Direction[];
    private name: string;
    private display: string;

    constructor(data: DirectionGroupDataReference, docRef?: DocumentReference) {
        super(data, docRef);
        this.directions = data.directions;
        this.name = data.name;
        this.display = data.display;
    }
    getDirections(): Direction[] {
        return this.directions;
    }
}

export class Direction extends DMObject<DirectionDataReference> {
    private content: (String | DirectionIngredientDataReference)[];
    private index: number;
    private ingredients: IngredientsDataReference;

    constructor(data: DirectionDataReference, docRef?: DocumentReference) {
        super(data, docRef);

        this.content = data.content;
        this.index = data.index;
        this.ingredients = data.ingredients;
    }
}
