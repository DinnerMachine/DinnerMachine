/*
~ ~ ~ DinnerMachine - Recipe Manager & Generator ~ ~ ~
- Topology/Data -

@file: api/Topology/Data.ts
@author: Dallin Guisti
@description: Data classes to help
    manage DinnerMachine data.
@version: 1.0.0
@created 8/21/2022
@updated 8/21/2022

Copyright (c) 2023 Dallin Guisti. All rights reserved.
*/

/*
=================
Table of Contents
=================
1. Imports
    a. Types
    b. Objet Parents
2. Range
*/

/* ----- 1. Imports ----- */

/* a. Type Imports */
import { DMObjectData } from './types';

/* b. Object Parents */
import { DMObject } from './Abstracts';

export class Range extends DMObject {
    private min: number;
    private max: number;

    /**
     * @description Manages DinnerMachine numeric ranges.
     * @param rangeJSON DataJSON object to initialize Range class with.
     * @param docRef DocumentReference to bind Range class to.
     */
    constructor(rangeJSON: DMObjectData, docRef = null) {
        super(rangeJSON, docRef);

        this.min = rangeJSON.min;
        this.max = rangeJSON.max;
    }
}
