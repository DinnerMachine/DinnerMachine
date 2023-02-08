import { DocumentReference } from 'firebase/firestore';

// users/[userID].perms (Data)
export interface PermsHandlerDataReference extends DMObjectData {
    groups?: GroupsDataReference;
    permissions?: PermsDataReference;
}

export interface PermsHandlerDataObject extends DMObjectData {
    groups?: Groups;
    permissions?: Perms;
}

// users/[userID].perms.groups (Data)
export interface GroupsDataReference extends DMObjectData {
    groups?: DocumentReference[];
}

export interface GroupsDataObject extends DMObjectData {
    groups?: Group[];
}

// users/[userID].perms.permissions (Data)
export interface PermsDataReference extends DMObjectData {
    groups?: DocumentReference[];
}

export interface PermsDataObject extends DMObjectData {
    groups?: Perm[];
}
