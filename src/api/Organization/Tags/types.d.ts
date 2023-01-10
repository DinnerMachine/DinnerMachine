import { DMObjectData } from '@api/Topology/types';

/* tags (Collection) 
    | recipes/[recipeID].tags (Data)
    | users/[userID]::Recipes/[recipeID].tags (Data)
*/
export type TagsDataReference = DMObjectData & {
    tags: DocumentReference[];
    type: 'Tags';
};
export type TagsDataObject = DMObjectData & {
    tags: Tags[];
    type: 'Tags';
};

// tags/[tagID] (Document)
export type TagDataReference = DMObjectData & {
    name: string;
    parent?: DocumentReference;
    default: boolean;
    type: 'Tag';
};
