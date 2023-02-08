import { Range } from '@api/Topology/Data';
import { DMObjectData } from '@api/Topology/types';
import { CollectionReference, DocumentReference } from 'firebase/firestore';
import Ingredient from './Ingredient';

// recipes/[recipeID]::Ingredients (Collection)
export interface IngredientsDataReference extends DMObjectData {
    ingredients?: DocumentReference[];
}

export interface IngredientsDataObject extends DMObjectData {
    ingredients?: IngredientGroup[];
}

// recipes/[recipeID]::Ingredients/[g_ingredientGroupID] (Document)
export interface IngredientGroupDataReference extends DMObjectData {
    name?: string;
    display?: string;
    ingredients?: DocumentReference[];
}

export interface IngredientGroupDataObject extends DMObjectData {
    name?: string;
    display?: string;
    ingredients?: Ingredient[];
}

// recipes/[recipeID]::Ingredients/[i_ingredientID] (Document)
export interface IngredientDataReference extends DMObjectData {
    name?: string;
    display?: string;
    quantity?: number | string;
    units?: DocumentReference;
}

export interface IngredientDataObject extends DMObjectData {
    name?: string;
    display?: string;
    quantity?: number | Range;
    units?: Unit;
}

// recipes/[recipeId]::Directions/[directionId].content.{data} (Data)
export interface DirectionIngredientDataReference extends DMObjectData {
    display?: string;
    ingredient?: DocumentReference[];
}

export interface DirectionIngredientDataObject extends DMObjectData {
    display?: string;
    ingredient?: Ingredient;
}
