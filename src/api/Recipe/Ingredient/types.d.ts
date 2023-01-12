import { Range } from '@api/Topology/Data';
import { DMObjectData } from '@api/Topology/types';
import { CollectionReference, DocumentReference } from 'firebase/firestore';
import Ingredient from './Ingredient';

// recipes/[recipeID]::Ingredients (Collection)
export type IngredientsDataReference = DMObjectData & {
    ingredients: DocumentReference[];
};

export type IngredientsDataObject = DMObjectData & {
    ingredients: IngredientGroup[];
};

// recipes/[recipeID]::Ingredients/[g_ingredientGroupID] (Document)
export type IngredientGroupDataReference = DMObjectData & {
    name: string;
    display: string;
    ingredients: DocumentReference[];
};

export type IngredientGroupDataObject = DMObjectData & {
    name: string;
    display: string;
    ingredients: Ingredient[];
};

// recipes/[recipeID]::Ingredients/[i_ingredientID] (Document)
export type IngredientDataReference = DMObjectData & {
    name: string;
    display: string;
    quantity: number | string;
    units: DocumentReference;
};

export type IngredientDataObject = DMObjectData & {
    name: string;
    display: string;
    quantity: number | Range;
    units: Unit;
};

// recipes/[recipeId]::Directions/[directionId].content.{data} (Data)
export type DirectionIngredientDataReference = DMObjectData & {
    display: string;
    ingredient: DocumentReference[];
};

export type DirectionIngredientDataObject = DMObjectData & {
    display: string;
    ingredient: Ingredient;
};
