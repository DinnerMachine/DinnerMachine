import { DMObjectData } from '@api/Topology/types';

// sources (Collection) | recipes/[recipeID].sources (Data)
export interface SourcesDataReference extends DMObjectData {
    sources?: DocumentReference[];
}

export interface SourcesDataObject extends DMObjectData {
    sources?: Source[];
}

// sources/[sourceID] (Document)
export interface SourceDataReference extends DMObjectData {
    name?: string;
    url?: string;
    lastUpdated?: Date;
}

export interface SourceDataObject extends DMObjectData {
    name?: string;
    url?: string;
    lastUpdated?: Date;
}
