/*
~ ~ ~ DinnerMachine - Recipe Manager & Generator ~ ~ ~
- Topology/types -

@file: api/Topology/types.ts
@author: Dallin Guisti
@description: Useful TypeScript type
    definitions for DinnerMachine Topology.
@version: 1.0.0
@created 8/21/2022
@updated 8/21/2022

Copyright (c) 2023 Dallin Guisti. All rights reserved.
*/

/*
=================
Table of Contents
=================
1. Data Types
*/

/* ----- 1. Data Types ----- */

/**
 * @description DataJSON type, used to store generic DinnerMachine data.
 */
export type DMObjectData = {
    [key: string]: any;
    type: string;
};
