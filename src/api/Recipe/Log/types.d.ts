import Category from '@api/Organization/Category';
import { DMObjectData } from '@api/Topology/types';
import { DocumentReference } from 'firebase/firestore';

// users/[userID]::Logs/[logID] (Document)
export type LogDataReference = DMObjectData & {
    name: string;
    notes: NotesDataReference;
    rating?: number;
    prepTime?: number;
    cookTime?: number;
    factor: number;
    category: DocumentReference;
    recipe?: DocumentReference;
    timeEaten: Date;
    timeRecorded: Date;
    type: 'Log';
};

export type LogDataObject = DMObjectData & {
    name: string;
    notes: Notes;
    rating?: number;
    prepTime?: number;
    cookTime?: number;
    factor: number;
    category: Category;
    recipe?: RecipeUser;
    timeEaten: Date;
    timeRecorded: Date;
    type: 'Log';
};