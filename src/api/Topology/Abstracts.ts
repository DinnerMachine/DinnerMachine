/*
~ ~ ~ RecipeGen - Recipe Manager & Generator ~ ~ ~
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
    a. RGObject
*/

/* ----- 1. Imports ----- */
/* a. Firebase Imports */
import { DocumentReference, getDoc } from "firebase/firestore";

/* b. Object Parents */
import { DataJSON } from "./types";

export abstract class RGObject {
    protected bound: boolean;
    protected dataJSON: DataJSON;
    protected docRef: DocumentReference | null;

    /** 
    @description Generic RGObject with methods for general data management.
    @param dataJSON DataJSON object to initialize RGObject class with.
    @param docRef - DocumentReference to bind RGObject class to.
    */
    constructor(dataJSON: DataJSON, docRef?: DocumentReference | null) {
        this.bound = false;
        this.dataJSON = dataJSON;
        this.docRef = docRef || null;

        if (docRef) this.bound = true;
    }
}
