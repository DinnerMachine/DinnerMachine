import { DMObjectData } from '@api/Topology/types';
import Review from './Review';

// recipes/[recipeID]::Reviews (Collection)
export type ReviewsDataReference = DMObjectData & {
    reviews: DocumentReference[];
    type: 'Reviews';
};

export type ReviewsDataObject = DMObjectData & {
    reviews: Review[];
    type: 'Reviews';
};

// recipes/[recipeID]::Reviews/[reviewID] (Document)
export type ReviewDataReference = DMObjectData & {
    rating: number;
    review: string;
    type: 'Review';
};

export type ReviewDataObject = DMObjectData & {
    rating: number;
    review: string;
    type: 'Review';
};
