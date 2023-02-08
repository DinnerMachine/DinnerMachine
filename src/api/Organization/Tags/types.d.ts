import { DMObjectData } from '@api/Topology/types';

/* tags (Collection) 
    | recipes/[recipeID].tags (Data)
    | users/[userID]::Recipes/[recipeID].tags (Data)
*/
export interface TagsDataReference extends DMObjectData {
    tags?: DocumentReference[];
}
export interface TagsDataObject extends DMObjectData {
    tags?: Tags[];
}

// tags/[tagID] (Document)
export interface TagDataReference extends DMObjectData {
    name?: string;
    parent?: DocumentReference;
    default?: boolean;
}
