import { DMObjectData } from '@api/Topology/types';

// users/[userId]::Recipes/[recipeID].notes (Data)
export type NotesDataReference = DMObjectData & {
    notes: NoteDataReference[];
};

export type NotesDataObject = DMObjectData & {
    notes: Note[];
};

// users/[userId]::Recipes/[recipeID].notes[noteIndex] (Data)
export type NoteDataReference = DMObjectData & {
    note: string;
};

export type NoteDataObject = DMObjectData & {
    note: string;
};
