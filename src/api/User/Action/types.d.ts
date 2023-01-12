import { DMObjectData } from '@api/Topology/types';

// users/[userId].actions (Data)
export type ActionsDataReference = DMObjectData & {
    actions: ActionDataReference[];
};

export type ActionsDataObject = DMObjectData & {
    actions: Action[];
};

// users/[userId].actions[actionIndex] (Data)
export type ActionDataReference = DMObjectData & {
    name: string;
    date: Date;
};

export type ActionDataObject = DMObjectData & {
    name: string;
    date: Date;
};
