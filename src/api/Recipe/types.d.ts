/*
~ ~ ~ DinnerMachine - Recipe Manager & Generator ~ ~ ~
- User/User -

@file: api/Recipe/types.ts
@author: Dallin Guisti
@description: Type definitions for recipes.
@version: 1.0.1
@created 8/21/2022
@updated 1/9/2023

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
2. Recipes
3. RecipeGlobal
4. RecipeUser
*/

/* ----- 1. Imports ----- */

import {
    CollectionReference,
    DocumentReference,
    Timestamp,
} from 'firebase/firestore';
import { StorageReference } from 'firebase/storage';

import { DMObjectData } from '@api/Topology/types';

import Category from '@api/Organization/Category';
import User from '../User/User';
import Directions from './Direction/Directions';
import Ingredient, { DirectionIngredient } from './Ingredient/Ingredient';
import Log from './Log/Log';
import RecipeGlobal, { RecipeUser } from './Recipe';
import Review from './Review';
import { TagsDataReference } from '@api/Organization/Tags/types';
import { SourcesDataReference } from './Source/types';
import { AttachmentsDataReference } from './Attachment/types';

/* ----- 2. Recipes ----- */

export type RecipesDataReference = {
    recipes: CollectionReference; // ==> RecipeUser[]
    type: 'Recipes';
};

export type RecipesDataObject = {
    recipes: RecipeUser[];
    type: 'Recipes';
};

/* ----- 3. RecipeGlobal ----- */
// recipes/[recipeID] (Document)

/**
 * DataReference
 * Used for raw data transfer to/from Firestore.
 */
export type RecipeGlobalDataReference = DMObjectData & {
    attachments: AttachmentsDataReference; // Storage locations for attachments
    author?: string;
    category: DocumentReference; // Category document reference
    prepTime?: number;
    cookTime?: number;
    serves?: number;
    creator?: DocumentReference; // Document reference to User
    description?: string;
    directions: CollectionReference; // Directions Collection
    ingredients: CollectionReference; // Ingredients Collection
    name: string;
    reviews: CollectionReference; // Reviews Collection
    tags: TagsDataReference; // Tags resolves to DocumentReference[]
    thumbnail?: StorageReference; // Thumbnail storage location
    sources: SourcesDataReference; // Sources resolves to DocumentReference[]
    private: boolean;
    type: 'RecipeGlobal';
};

/**
 * DataObject
 * Used for local manipulation of recipe data.
 */
export type RecipeGlobalDataObject = DMObjectData & {
    attachments: Attachments; // Storage locations for attachments
    author?: string;
    category: Category; // Category document reference
    prepTime?: number;
    cookTime?: number;
    serves?: number;
    creator?: User; // Document reference to User
    description?: string;
    directions: Directions; // Directions Collection
    ingredients: Ingredients; // Ingredients Collection
    name: string;
    reviews: Reviews; // Reviews Collection
    tags: Tags; // Tags resolves to DocumentReference[]
    thumbnail?: string; // Thumbnail storage location
    sources: Sources; // Sources resolves to DocumentReference[]
    private: boolean;
    type: 'RecipeGlobal';
};

/* ----- 4. RecipeUser ----- */
// users/[userID]::Recipes/[recipeID] (Document)

export type RecipeUserDataReference = DMObjectData & {
    name: string;
    recipeGlobal: DocumentReference; // Reference to global recipe
    rating: number;
    notes: NotesData;
    tags: TagsDataReference;
    type: 'RecipeUser';
};

export type RecipeUserDataObject = DMObjectData & {
    name: string;
    recipeGlobal: RecipeGlobal; // Reference to global recipe
    rating: number;
    notes: Notes;
    tags: Tags;
    type: 'RecipeUser';
};
