import { Range } from '@api/Topology/Data';
import { DMObjectData } from '@api/Topology/types';
import { CollectionReference, DocumentReference } from 'firebase/firestore';
import Ingredient from './Ingredient';

// recipes/[recipeID]::Ingredients (Collection)
export type IngredientsDataReference = DMObjectData & {
    ingredients: DocumentReference[];
    type: 'Ingredients';
};

export type IngredientsDataObject = DMObjectData & {
    ingredients: IngredientGroup[];
    type: 'Ingredients';
};

// recipes/[recipeID]::Ingredients/[g_ingredientGroupID] (Document)
export type IngredientGroupDataReference = DMObjectData & {
    name: string;
    display: string;
    ingredients: DocumentReference[];
    type: 'IngredientGroup';
};

export type IngredientGroupDataObject = DMObjectData & {
    name: string;
    display: string;
    ingredients: Ingredient[];
    type: 'IngredientGroup';
};

// recipes/[recipeID]::Ingredients/[i_ingredientID] (Document)
export type IngredientDataReference = DMObjectData & {
    name: string;
    display: string;
    quantity: number | string;
    units: DocumentReference;
    type: 'Ingredient';
};

export type IngredientDataObject = DMObjectData & {
    name: string;
    display: string;
    quantity: number | Range;
    units: Unit;
    type: 'Ingredient';
};

// recipes/[recipeId]::Directions/[directionId].content.{data} (Data)
export type DirectionIngredientDataReference = DMObjectData & {
    display: string;
    ingredient: DocumentReference[];
    type: 'DirectionIngredient';
};

export type DirectionIngredientDataObject = DMObjectData & {
    display: string;
    ingredient: Ingredient;
    type: 'DirectionIngredient';
};
