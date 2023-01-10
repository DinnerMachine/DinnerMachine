import { DirectionIngredient } from '../Ingredient/Ingredient';
import {
    DirectionIngredientDataReference,
    IngredientsDataObject,
} from '../Ingredient/types';
import { Direction, DirectionGroup } from './Directions';

// recipes/[recipeID]::Directions (Collection)
export type DirectionsDataReference = DMObjectData & {
    directions: DocumentReference[];
    type: 'Directions';
};

export type DirectionsDataObject = DMObjectData & {
    directions: DirectionGroup[];
    type: 'Directions';
};

// recipes/[recipeID]::Directions/[g_directionGroupId] (Document)
export type DirectionGroupDataReference = DMObjectData & {
    name: string;
    display: string;
    directions: DocumentReference[];
    type: 'DirectionGroup';
};

export type DirectionGroupDataObject = DMObjectData & {
    name: string;
    display: string;
    directions: Direction[];
    type: 'DirectionGroup';
};

// recipes/[recipeID]::Directions/[d_directionId] (Document)
export type DirectionDataReference = DMObjectData & {
    content: (String | DirectionIngredientDataReference)[];
    index: number;
    ingredients: IngredientsDataObject;
    type: 'Direction';
};

export type DirectionDataObject = DMObjectData & {
    content: (String | DirectionIngredient)[];
    index: number;
    ingredients: Ingredients;
    type: 'Direction';
};
