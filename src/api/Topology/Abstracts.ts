/*
~ ~ ~ DinnerMachine - Recipe Manager & Generator ~ ~ ~
- Topology/Abstracts -

@file: api/Topology/Abstracts.ts
@author: Dallin Guisti
@description: Abstract classes to help maintain
    API topology and structure.
@version: 1.0.0
@created 8/20/2022
@updated 8/21/2022

Copyright (c) 2023 Dallin Guisti. All rights reserved.
*/

/*
=================
Table of Contents
=================
1. Imports
    a. Firebase
    b. Object Parents
2. Abstract Classes
    a. DMObject
*/

/* ----- 1. Imports ----- */
/* a. Firebase Imports */
import {
    CollectionReference,
    DocumentReference,
    FirestoreDataConverter,
    getDoc,
} from 'firebase/firestore';

/* b. Object Parents */
import { DMObjectData } from './types';

export abstract class DMObject<DMObjectData> {
    protected bound: boolean;
    protected data: DMObjectData;
    protected docRef?: DocumentReference;

    /** 
    @description Generic DMObject with methods for general data management.
    @param data DMObjectData object to initialize DMObject class with.
    @param docRef - DocumentReference to bind DMObject class to.
    */
    constructor(data: DMObjectData, docRef?: DocumentReference) {
        this.bound = false;
        this.data = data;
        this.docRef = docRef;

        if (docRef) this.bound = true;
    }

    getData(): DMObjectData {
        return this.data;
    }
}

export abstract class DMCollection<DMObjectData> {
    protected data: DMObjectData;
    protected _collectionRef?: CollectionReference;
    constructor(data: DMObjectData, collectionRef?: CollectionReference) {
        this.data = data;
        this._collectionRef = collectionRef;
    }

    public get collectionRef(): CollectionReference | undefined {
        return this._collectionRef;
    }
}

/*
const DMObjectConverter: FirestoreDataConverter<DMObject<DMObjectData>> = {
    toFirestore: (object: DMObject<DMObjectData>) => {
        return object.getData();
    },
    fromFirestore: async (snapshot, options) => {
        const data = snapshot.data(options);
        const docRef = snapshot.ref;
        const dmObject = new DMObject(data as DMObjectData, docRef);
        return dmObject;
    },
};
*/
