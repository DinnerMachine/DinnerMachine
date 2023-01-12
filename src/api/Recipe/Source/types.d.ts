import { DMObjectData } from '@api/Topology/types';

// sources (Collection) | recipes/[recipeID].sources (Data)
export type SourcesDataReference = DMObjectData & {
    sources: DocumentReference[];
};

export type SourcesDataObject = DMObjectData & {
    sources: Source[];
};

// sources/[sourceID] (Document)
export type SourceDataReference = DMObjectData & {
    name: string;
    url: string;
    lastUpdated: Date;
};

export type SourceDataObject = DMObjectData & {
    name: string;
    url: string;
    lastUpdated: Date;
};
