import { DMObjectData } from '@api/Topology/types';

// users/[userId].actions (Data)
export type ActionsDataReference = DMObjectData & {
    actions: ActionDataReference[];
    type: 'Actions';
};

export type ActionsDataObject = DMObjectData & {
    actions: Action[];
    type: 'Actions';
};

// users/[userId].actions[actionIndex] (Data)
export type ActionDataReference = DMObjectData & {
    name: string;
    date: Date;
    type: 'Action';
};

export type ActionDataObject = DMObjectData & {
    name: string;
    date: Date;
    type: 'Action';
};
