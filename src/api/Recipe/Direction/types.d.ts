import { DirectionIngredient } from '../Ingredient/Ingredient';
import {
    DirectionIngredientDataReference,
    IngredientsDataObject,
} from '../Ingredient/types';
import { Direction, DirectionGroup } from './Directions';

// recipes/[recipeID]::Directions (Collection)
export type DirectionsDataReference = DMObjectData & {
    directions: DocumentReference[];
};

export type DirectionsDataObject = DMObjectData & {
    directions: DirectionGroup[];
};

// recipes/[recipeID]::Directions/[g_directionGroupId] (Document)
export type DirectionGroupDataReference = DMObjectData & {
    name: string;
    display: string;
    directions: DocumentReference[];
};

export type DirectionGroupDataObject = DMObjectData & {
    name: string;
    display: string;
    directions: Direction[];
};

// recipes/[recipeID]::Directions/[d_directionId] (Document)
export type DirectionDataReference = DMObjectData & {
    content: (String | DirectionIngredientDataReference)[];
    index: number;
    ingredients: IngredientsDataReference;
};

export type DirectionDataObject = DMObjectData & {
    content: (String | DirectionIngredient)[];
    index: number;
    ingredients: Ingredients;
};
