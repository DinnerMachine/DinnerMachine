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
    Timestamp,
} from 'firebase/firestore';
import {
    ProfileDataFirebase,
    ProfileDataReference,
    TokenDataReference,
    UserDataFirebase,
    UserDataReference,
} from '@api/User/types';
import { storage } from '@api/Firebase/init';
import { ref } from 'firebase/storage';
import { ActionsDataReference } from './Action/types';
import { PermsHandlerDataReference } from '@api/Permissions/types';

/* ----- 3. User Class ----- */

/** User class that houses DinnerMachine user data. */
export default class User extends DMObject<UserDataReference> {
    private UUID: string;
    private actions: ActionsDataReference;
    private perms: PermsHandlerDataReference;
    private logs: CollectionReference;
    private profile: ProfileDataReference;
    private recipes: CollectionReference;
    private tokens: TokenDataReference[];

    constructor(data: UserDataReference, docRef?: DocumentReference) {
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

export const ProfileDataConverter = {
    toFirestore(profileUser: ProfileDataReference): ProfileDataFirebase {
        var profileFirebase = profileUser as any;

        if (profileUser.birthday)
            profileFirebase.birthday = Timestamp.fromDate(profileUser.birthday);
        if (profileUser.profilePicture)
            profileFirebase.profilePicture =
                profileUser.profilePicture.fullPath;

        return profileFirebase as ProfileDataFirebase;
    },
    fromFirestore(profileFirebase: ProfileDataFirebase): ProfileDataReference {
        var profileUser = profileFirebase as any;

        if (profileFirebase.birthday)
            profileUser.birthday = profileFirebase.birthday.toDate();
        if (profileFirebase.profilePicture)
            profileUser.profilePicture = ref(
                storage,
                profileFirebase.profilePicture,
            );

        return profileUser as ProfileDataReference;
    },
};

export const UserConverter: FirestoreDataConverter<User> = {
    toFirestore(user: User): UserDataFirebase {
        var dataUser = user.getData();
        var profileUser = dataUser.profile;
        var dataFirebase = dataUser as any;
        var profileFirebase = ProfileDataConverter.toFirestore(profileUser);

        dataFirebase.profile = profileFirebase;

        return dataFirebase as UserDataFirebase;
    },
    fromFirestore(snapshot: DocumentSnapshot, options: SnapshotOptions): User {
        var dataFirebase = snapshot.data()!;
        var profileFirebase = dataFirebase.profile;
        var dataUser = dataFirebase as any;
        var profileUser = ProfileDataConverter.fromFirestore(profileFirebase);

        dataUser.profile = profileUser;

        return new User(dataUser as UserDataReference, snapshot.ref);
    },
};
