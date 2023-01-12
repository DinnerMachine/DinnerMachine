import {
    SnapshotOptions,
    DocumentSnapshot,
    FirestoreDataConverter,
    DocumentReference,
    CollectionReference,
} from 'firebase/firestore';
import { DMObject, DMCollection } from '../../Topology/Abstracts';
import { Range } from '../../Topology/Data';
import { DMObjectData } from '../../Topology/types';
import {
    DirectionIngredientDataReference,
    IngredientDataReference,
    IngredientGroupDataReference,
    IngredientsDataReference,
} from './types';

export class Ingredients extends DMCollection<IngredientsDataReference> {
    private ingredients: DocumentReference[];

    constructor(
        data: IngredientsDataReference,
        collectionRef?: CollectionReference,
    ) {
        super(data, collectionRef);
        this.ingredients = data.ingredients;
    }
}

export class IngredientGroup extends DMObject<IngredientGroupDataReference> {
    private name: string;
    private display: string;
    private ingredients: DocumentReference[];

    constructor(
        data: IngredientGroupDataReference,
        docRef?: DocumentReference,
    ) {
        super(data, docRef);
        this.name = data.name;
        this.display = data.display;
        this.ingredients = data.ingredients;
    }
}

export const IngredientGroupConverter: FirestoreDataConverter<IngredientGroup> =
    {
        toFirestore: (ingredientGroup: IngredientGroup) => {
            return ingredientGroup.getData();
        },
        fromFirestore(
            snapshot: DocumentSnapshot,
            options: SnapshotOptions,
        ): IngredientGroup {
            const data = snapshot.data(options) as IngredientGroupDataReference;
            return new IngredientGroup(data, snapshot.ref);
        },
    };

export default class Ingredient extends DMObject<IngredientDataReference> {
    private name: string;
    private display: string;
    private quantity: number | string;
    private units: DocumentReference;

    /**
     *
     * @param data
     * @param docRef
     */
    constructor(data: IngredientDataReference, docRef?: DocumentReference) {
        super(data, docRef);

        this.name = data.name;
        this.display = data.display;
        this.quantity = data.quantity;
        this.units = data.units;
    }
}

/*
    • IngredientParent is an abstract for both
    • Ingredient is actual ingredient object
        - Members can be Object | Reference
    • IngredientReference is an object with references
*/

const IngredientConverter: FirestoreDataConverter<Ingredient> = {
    toFirestore: (ingredient: Ingredient) => {
        return ingredient.getData();
    },
    fromFirestore(
        snapshot: DocumentSnapshot,
        options: SnapshotOptions,
    ): Ingredient {
        const data = snapshot.data(options) as IngredientDataReference;
        return new Ingredient(data, snapshot.ref);
    },
};

export class DirectionIngredient extends DMObject<DirectionIngredientDataReference> {
    private display: string;
    private ingredient: DocumentReference[];

    constructor(
        data: DirectionIngredientDataReference,
        docRef?: DocumentReference,
    ) {
        super(data, docRef);
        this.display = data.display;
        this.ingredient = data.ingredient;
    }
}

const DirectionIngredientConverter: FirestoreDataConverter<DirectionIngredient> =
    {
        toFirestore: (directionIngredient: DirectionIngredient) => {
            return directionIngredient.getData();
        },
        fromFirestore(
            snapshot: DocumentSnapshot,
            options: SnapshotOptions,
        ): DirectionIngredient {
            const data = snapshot.data(
                options,
            ) as DirectionIngredientDataReference;
            return new DirectionIngredient(data, snapshot.ref);
        },
    };
