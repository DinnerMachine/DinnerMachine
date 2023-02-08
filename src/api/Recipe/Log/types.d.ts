import Category from '@api/Organization/Category/Category';
import { DMObjectData } from '@api/Topology/types';
import { DocumentReference } from 'firebase/firestore';

// users/[userID]::Logs (Collection)
export interface LogsDataReference extends DMObjectData {
    logs?: DocumentReference[];
}

export interface LogsDataObject extends DMObjectData {
    logs?: DirectionGroup[];
}

// users/[userID]::Logs/[logID] (Document)
export interface LogDataReference extends DMObjectData {
    name?: string;
    notes?: NotesDataReference;
    rating?: number;
    prepTime?: number;
    cookTime?: number;
    factor?: number;
    category?: DocumentReference;
    recipe?: DocumentReference;
    timeEaten?: Date;
    timeRecorded?: Date;
}

export interface LogDataObject extends DMObjectData {
    name?: string;
    notes?: Notes;
    rating?: number;
    prepTime?: number;
    cookTime?: number;
    factor?: number;
    category?: Category;
    recipe?: RecipeUser;
    timeEaten?: Date;
    timeRecorded?: Date;
}
