import { DocumentReference, Timestamp } from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';
import { MealData, RecipeUserData } from '../Recipe/types';
import { DataJSON } from '../Topology/types';

export type UserData = DataJSON & {
    UUID: string;
    profile: ProfileData;
    perms: {
        groups: DocumentReference[];
        permissions: DocumentReference[];
    };
    actions: ActionData;
    recipes: RecipeUserData[];
    mealHistory: MealData[];
    tokens: {
        [key: string]: string;
    };
    type: 'User';
};

export type InitUserData = {
    UUID?: string;
    profile: ProfileData;
    perms?: {
        groups: DocumentReference[];
        permissions: DocumentReference[];
    };
    actions?: ActionData;
    recipes?: RecipeUserData[];
    mealHistory?: MealData[];
    tokens?: {
        [key: string]: string;
    };
};

/**
 * @description User profile data type.
 */
export type ProfileData = {
    birthday: Timestamp;
    email: string;
    name: string;
    profilePicturePath?: string;
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
    [key: string]: Timestamp;
};

export type Action = {
    [key: string]: Date;
};
