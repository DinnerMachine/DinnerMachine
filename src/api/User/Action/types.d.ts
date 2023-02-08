import { DMObjectData } from '@api/Topology/types';

// users/[userId].actions (Data)
export interface ActionsDataReference extends DMObjectData {
    actions?: ActionDataReference[];
}

export interface ActionsDataObject extends DMObjectData {
    actions?: Action[];
}

// users/[userId].actions[actionIndex] (Data)
export interface ActionDataReference extends DMObjectData {
    name?: string;
    date?: Date;
}

export interface ActionDataObject extends DMObjectData {
    name?: string;
    date?: Date;
}
