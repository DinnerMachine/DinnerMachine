import {
    CollectionReference,
    DocumentReference,
    Timestamp,
} from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';
import { RecordData, RecipeUserData } from '../Recipe/types';
import { DMObjectData } from '../Topology/types';
import { ActionsDataReference } from './Action/types';

/*export type UserData = DMObjectData & {
    UUID: string;
    profile: ProfileData;
    perms: {
        groups: DocumentReference[];
        permissions: DocumentReference[];
    };
    actions: ActionData;
    recipes: RecipeUserData[];
    mealHistory: RecordData[];
    tokens: {
        [key: string]: string;
    };
};*/

// users/[userId] (Document)
export type UserDataReference = DMObjectData & {
    UUID: string;
    actions: ActionsDataReference;
    perms: PermsHandlerDataReference;
    logs: CollectionReference;
    profile: ProfileDataReference;
    recipes: CollectionReference;
    tokens: TokenDataReference[]; // Maybe make its own type later
};

export type UserDataObject = DMObjectData & {
    UUID: string;
    actions: Action;
    perms: PermsHandler;
    logs: Logs;
    profile: ProfileDataObject;
    recipes: Recipes;
    tokens: TokenDataObject;
};

export interface UserDataFirebase extends UserDataReference {
    profile: ProfileDataFirebase;
}

/*export type InitUserData = {
    UUID?: string;
    profile: ProfileData;
    perms?: {
        groups: DocumentReference[];
        permissions: DocumentReference[];
    };
    actions?: ActionData;
    recipes?: RecipeUserData[];
    mealHistory?: RecordData[];
    tokens?: {
        [key: string]: string;
    };
};*/

/**
 * @description User profile data type.
 */
// users/[userId].profile (Data)
export interface ProfileDataReference {
    birthday: Date;
    email: string;
    name: string;
    profilePicture?: StorageReference; // Storage references stored as string in Firestore
    username: string;
}

export type ProfileDataObject = {
    birthday: Date;
    email: string;
    name: string;
    profilePicture?: string; // Url of where it can be downlaoded
    username: string;
};

interface ProfileDataFirebase extends ProfileDataReference {
    birthday: Timestamp;
    profilePicture?: string;
}

export type TokenDataReference = {
    [key: string]: string;
};

export type TokenDataObject = {
    [key: string]: string;
};
