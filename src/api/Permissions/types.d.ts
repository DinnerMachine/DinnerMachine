import { DocumentReference } from 'firebase/firestore';

// users/[userID].perms (Data)
export type PermsHandlerDataReference = DMObjectData & {
    groups: GroupsDataReference;
    permissions: PermsDataReference;
    type: 'PermsHandler';
};

export type PermsHandlerDataObject = DMObjectData & {
    groups: Groups;
    permissions: Perms;
    type: 'PermsHandler';
};

// users/[userID].perms.groups (Data)
export type GroupsDataReference = DMObjectData & {
    groups: DocumentReference[];
    type: 'Groups';
};

export type GroupsDataObject = DMObjectData & {
    groups: Group[];
    type: 'Groups';
};

// users/[userID].perms.permissions (Data)
export type PermsDataReference = DMObjectData & {
    groups: DocumentReference[];
    type: 'Perms';
};

export type PermsDataObject = DMObjectData & {
    groups: Perm[];
    type: 'Perms';
};
