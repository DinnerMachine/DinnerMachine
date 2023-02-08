/*
~ ~ ~ DinnerMachine - Recipe Manager & Generator ~ ~ ~
- User/User -

@file?: api/Recipe/types.ts
@author?: Dallin Guisti
@description?: Type definitions for recipes.
@version?: 1.0.1
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

import Category from '@api/Organization/Category/Category';
import User from '../User/User';
import Directions from './Direction/Directions';
import Ingredient, { DirectionIngredient } from './Ingredient/Ingredient';
import Log from './Log/Log';
import RecipeGlobal, { RecipeUser } from './Recipe';
import Review from './Review/Review';
import { TagsDataReference } from '@api/Organization/Tags/types';
import { SourcesDataReference } from './Source/types';
import { AttachmentsDataReference } from './Attachment/types';

/* ----- 2. Recipes ----- */
// users/[userID]/Recipes (Collection)
export interface RecipesDataReference extends DMObjectData {
    recipes?: DocumentReference[]; // ==> RecipeUser[]
}

export interface RecipesDataObject extends DMObjectData {
    recipes?: RecipeUser[];
}

/* ----- 3. RecipeGlobal ----- */
// recipes/[recipeID] (Document)

/**
 * DataReference
 * Used for raw data transfer to/from Firestore.
 */
export interface RecipeGlobalDataReference extends DMObjectData {
    attachments?: AttachmentsDataReference; // Storage locations for attachments
    author?: string;
    category?: DocumentReference; // Category document reference
    prepTime?: number;
    cookTime?: number;
    serves?: number;
    creator?: DocumentReference; // Document reference to User
    description?: string;
    directions?: CollectionReference; // Directions Collection
    ingredients?: CollectionReference; // Ingredients Collection
    name?: string;
    reviews?: CollectionReference; // Reviews Collection
    tags?: TagsDataReference; // Tags resolves to DocumentReference[]
    thumbnail?: StorageReference; // Thumbnail storage location
    sources?: SourcesDataReference; // Sources resolves to DocumentReference[]
    private?: boolean;
}

/**
 * DataObject
 * Used for local manipulation of recipe data.
 */
export interface RecipeGlobalDataObject extends DMObjectData {
    attachments?: Attachments; // Storage locations for attachments
    author?: string;
    category?: Category; // Category document reference
    prepTime?: number;
    cookTime?: number;
    serves?: number;
    creator?: User; // Document reference to User
    description?: string;
    directions?: Directions; // Directions Collection
    ingredients?: Ingredients; // Ingredients Collection
    name?: string;
    reviews?: Reviews; // Reviews Collection
    tags?: Tags; // Tags resolves to DocumentReference[]
    thumbnail?: string; // Thumbnail storage location
    sources?: Sources; // Sources resolves to DocumentReference[]
    private?: boolean;
}

/* ----- 4. RecipeUser ----- */
// users/[userID]::Recipes/[recipeID] (Document)

export interface RecipeUserDataReference extends DMObjectData {
    name?: string;
    recipeGlobal?: DocumentReference; // Reference to global recipe
    rating?: number;
    notes?: NotesDataReference;
    tags?: TagsDataReference;
}

export interface RecipeUserDataObject extends DMObjectData {
    name?: string;
    recipeGlobal?: RecipeGlobal; // Reference to global recipe
    rating?: number;
    notes?: Notes;
    tags?: Tags;
}
