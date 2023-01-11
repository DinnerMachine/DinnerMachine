import { DMObjectData } from '@api/Topology/types';

// users/[userId]::Recipes/[recipeID].notes (Data)
export type NotesDataReference = DMObjectData & {
    notes: NoteDataReference[];
    type: 'Notes';
};

export type NotesDataObject = DMObjectData & {
    notes: Note[];
    type: 'Notes';
};

// users/[userId]::Recipes/[recipeID].notes[noteIndex] (Data)
export type NoteDataReference = DMObjectData & {
    note: string;
    type: 'Note';
};

export type NoteDataObject = DMObjectData & {
    note: string;
    type: 'Note';
};
