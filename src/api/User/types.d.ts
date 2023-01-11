import {
    CollectionReference,
    DocumentReference,
    Timestamp,
} from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';
import { RecordData, RecipeUserData } from '../Recipe/types';
import { DMObjectData } from '../Topology/types';
import { ActionDataReference } from './Action/types';

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
    type: 'User';
};*/

// users/[userId] (Document)
export type UserDataReference = DMObjectData & {
    UUID: string;
    actions: ActionDataReference;
    perms: PermsHandlerDataReference;
    logs: CollectionReference;
    profile: ProfileDataReference;
    recipes: CollectionReference;
    tokens: TokenDataReference;
    type: 'User';
};

export type UserDataObject = DMObjectData & {
    UUID: string;
    actions: Action;
    perms: PermsHandler;
    logs: Logs;
    profile: ProfileDataObject;
    recipes: Recipes;
    tokens: TokenDataObject;
    type: 'User';
};

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
export type ProfileDataReference = {
    birthday: Date;
    email: string;
    name: string;
    profilePicture?: StorageReference; // Storage references stored as string in Firestore
    username: string;
};

export type ProfileDataObject = {
    birthday: Date;
    email: string;
    name: string;
    profilePicture?: string; // Url of where it can be downlaoded
    username: string;
};

export type TokenDataReference = {
    [key: string]: string;
};

export type TokenDataObject = {
    [key: string]: string;
};
