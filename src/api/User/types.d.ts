import {
    CollectionReference,
    DocumentReference,
    Timestamp,
} from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';
import { RecordData, RecipeUserData } from '../Recipe/types';
import { DMObjectData } from '../Topology/types';

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

export type UserDataReference = DMObjectData & {
    UUID: string;
    actions: ActionData; // Maaaybe change to its own object
    perms: Perms;
    logs: CollectionReference;
    profile: ProfileData;
    recipes: CollectionReference;
    tokens: TokenData;
};

export type UserDataObject = DMObjectData & {
    UUID: string;
    actions: ActionData;
    perms: Perms;
    logs: Logs;
    profile: ProfileData;
    recipes: Recipes;
    tokens: TokenData;
};

export type UserData = UserDataReference | UserDataObject;

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
export type ProfileData = {
    birthday: Date;
    email: string;
    name: string;
    profilePicture?: StorageReference | string;
    username: string;
};

export type Profile = {
    birthday?: Date;
    email: string;
    name: string;
    profilePicturePath?: string;
    profilePictureReference?: StorageReference;
    username: string;
};

export type ActionData = {
    [key: string]: Date;
};

export type TokenData = {
    [key: string]: Date;
};
