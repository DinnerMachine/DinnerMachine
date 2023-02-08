import { DirectionIngredient } from '../Ingredient/Ingredient';
import {
    DirectionIngredientDataReference,
    IngredientsDataObject,
} from '../Ingredient/types';
import { Direction, DirectionGroup } from './Directions';

// recipes/[recipeID]::Directions (Collection)
export interface DirectionsDataReference extends DMObjectData {
    directions?: DocumentReference[];
}

export interface DirectionsDataObject extends DMObjectData {
    directions?: DirectionGroup[];
}

// recipes/[recipeID]::Directions/[g_directionGroupId] (Document)
export interface DirectionGroupDataReference extends DMObjectData {
    name?: string;
    display?: string;
    directions?: DocumentReference[];
}

export interface DirectionGroupDataObject extends DMObjectData {
    name?: string;
    display?: string;
    directions?: Direction[];
}

// recipes/[recipeID]::Directions/[d_directionId] (Document)
export interface DirectionDataReference extends DMObjectData {
    content: (String | DirectionIngredientDataReference)[];
    index?: number;
    ingredients?: IngredientsDataReference;
}

export interface DirectionDataObject extends DMObjectData {
    content: (String | DirectionIngredient)[];
    index?: number;
    ingredients?: Ingredients;
}
