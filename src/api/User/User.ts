/*
~ ~ ~ DinnerMachine - Recipe Manager & Generator ~ ~ ~
- User/User -

@file: api/User/User.ts
@author: Dallin Guisti
@description: User class and utilities.
@version: 1.0.0
@created 8/21/2022
@updated 8/22/2022

Copyright (c) 2023 Dallin Guisti. All rights reserved.
*/

/*
=================
Table of Contents
=================
1. Imports
    a. Firebase
    b. Object Parents
    c. Types
    d. Necessary Classes
2. Constants
3. User Class
4. Generator Functions
*/

/* ----- 1. Imports ----- */

import { DMObject } from '@api/Topology/Abstracts';
import {
    CollectionReference,
    DocumentReference,
    DocumentSnapshot,
    FirestoreDataConverter,
    SnapshotOptions,
} from 'firebase/firestore';
import { ActionData, ProfileData, TokenData, UserData } from '@api/User/types';
import { storage } from '@api/Firebase/init';
import { ref } from 'firebase/storage';

/* ----- 3. User Class ----- */

/** User class that houses DinnerMachine user data. */
export default class User extends DMObject<UserData> {
    private UUID: string;
    private actions: ActionData;
    private perms: Perms;
    private logs: CollectionReference; // ==> Logs
    private profile: ProfileData;
    private recipes: CollectionReference; // ==> Recipes
    private tokens: TokenData;
    constructor(data: UserData, docRef?: DocumentReference | null) {
        super(data, docRef);
        this.UUID = data.UUID;
        this.actions = data.actions;
        this.perms = data.perms;
        this.logs = data.logs;
        this.profile = data.profile;
        this.recipes = data.recipes;
        this.tokens = data.tokens;
    }
}

export const UserConverter: FirestoreDataConverter<User> = {
    toFirestore(user: User): UserData {
        return user.getData();
    },
    fromFirestore(snapshot: DocumentSnapshot, options: SnapshotOptions): User {
        const dataFirebase = snapshot.data(options);
        const data = dataFirebase;
        if (data) {
            if (dataFirebase.profile.birthday)
                data.profile.birthday = dataFirebase.profile.birthday.toDate();
            if (dataFirebase.profile.profilePicture)
                data.profile.profilePicture = ref(
                    storage,
                    dataFirebase.profile.profilePicture,
                );
            return new User(data as UserData, snapshot.ref);
        }
    },
};
