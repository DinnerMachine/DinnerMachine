import {
    SnapshotOptions,
    DocumentSnapshot,
    FirestoreDataConverter,
    DocumentReference,
} from 'firebase/firestore';
import { DMObject } from '../../Topology/Abstracts';
import { Range } from '../../Topology/Data';
import { DMObjectData } from '../../Topology/types';
import {
    DirectionIngredientDataReference,
    IngredientDataReference,
    IngredientGroupDataReference,
    IngredientsDataReference,
} from './types';

export class Ingredients extends DMObject<IngredientsDataReference> {
    private ingredients: DocumentReference[];
    private type: 'Ingredients' = 'Ingredients';

    constructor(data: IngredientsDataReference, docRef?: DocumentReference) {
        super(data, docRef);
        this.ingredients = data.ingredients;
    }
}

export class IngredientGroup extends DMObject<IngredientGroupDataReference> {
    private name: string;
    private display: string;
    private ingredients: DocumentReference[];
    private type: 'IngredientGroup' = 'IngredientGroup';

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
    private type: 'Ingredient' = 'Ingredient';

    /**
     *
     * @param data
     * @param docRef
     */
    constructor(
        data: IngredientDataReference,
        docRef?: DocumentReference | null,
    ) {
        super(data, docRef);

        this.name = data.name;
        this.display = data.display;
        this.quantity = data.quantity;
        this.units = data.units;
    }
}

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
    private type: 'DirectionIngredient' = 'DirectionIngredient';

    constructor(
        data: DirectionIngredientDataReference,
        docRef?: DocumentReference | null,
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
