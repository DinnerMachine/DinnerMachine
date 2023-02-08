import { DMObjectData } from '@api/Topology/types';
import Review from './Review';

// recipes/[recipeID]::Reviews (Collection)
export interface ReviewsDataReference extends DMObjectData {
    reviews?: DocumentReference[];
}

export interface ReviewsDataObject extends DMObjectData {
    reviews?: Review[];
}

// recipes/[recipeID]::Reviews/[reviewID] (Document)
export interface ReviewDataReference extends DMObjectData {
    rating?: number;
    review?: string;
}

export interface ReviewDataObject extends DMObjectData {
    rating?: number;
    review?: string;
}
