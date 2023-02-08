import { DMObjectData } from '@api/Topology/types';

// users/[userId]::Recipes/[recipeID].notes (Data)
export interface NotesDataReference extends DMObjectData {
    notes?: NoteDataReference[];
}

export interface NotesDataObject extends DMObjectData {
    notes?: Note[];
}

// users/[userId]::Recipes/[recipeID].notes[noteIndex] (Data)
export interface NoteDataReference extends DMObjectData {
    note?: string;
}

export interface NoteDataObject extends DMObjectData {
    note?: string;
}
