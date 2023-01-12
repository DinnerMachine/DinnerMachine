import { DMObjectData } from '@api/Topology/types';
import Review from './Review';

// recipes/[recipeID]::Reviews (Collection)
export type ReviewsDataReference = DMObjectData & {
    reviews: DocumentReference[];
};

export type ReviewsDataObject = DMObjectData & {
    reviews: Review[];
};

// recipes/[recipeID]::Reviews/[reviewID] (Document)
export type ReviewDataReference = DMObjectData & {
    rating: number;
    review: string;
};

export type ReviewDataObject = DMObjectData & {
    rating: number;
    review: string;
};
