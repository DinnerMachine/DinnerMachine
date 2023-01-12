import { DocumentReference } from 'firebase/firestore';

// users/[userID].perms (Data)
export type PermsHandlerDataReference = DMObjectData & {
    groups: GroupsDataReference;
    permissions: PermsDataReference;
};

export type PermsHandlerDataObject = DMObjectData & {
    groups: Groups;
    permissions: Perms;
};

// users/[userID].perms.groups (Data)
export type GroupsDataReference = DMObjectData & {
    groups: DocumentReference[];
};

export type GroupsDataObject = DMObjectData & {
    groups: Group[];
};

// users/[userID].perms.permissions (Data)
export type PermsDataReference = DMObjectData & {
    groups: DocumentReference[];
};

export type PermsDataObject = DMObjectData & {
    groups: Perm[];
};
