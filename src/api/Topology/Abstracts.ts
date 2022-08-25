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

Copyright (c) 2022 Dallin Guisti. All rights reserved.
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
import { DocumentReference, getDoc } from 'firebase/firestore';

/* b. Object Parents */
import { DataJSON } from './types';

export abstract class DMObject {
    protected bound: boolean;
    protected dataJSON: DataJSON;
    protected docRef: DocumentReference | null;

    /** 
    @description Generic DMObject with methods for general data management.
    @param dataJSON DataJSON object to initialize DMObject class with.
    @param docRef - DocumentReference to bind DMObject class to.
    */
    constructor(dataJSON: DataJSON, docRef?: DocumentReference | null) {
        this.bound = false;
        this.dataJSON = dataJSON;
        this.docRef = docRef || null;

        if (docRef) this.bound = true;
    }
}
