/*
~ ~ ~ DinnerMachine - Recipe Manager & Generator ~ ~ ~
- Recipe/Recipe -

@file: api/Recipe/Recipe.ts
@author: Dallin Guisti
@description: Recipe class for recipe management.
@version: 1.0.0
@created 8/21/2022
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
    c. Types
    d. Necessary Classes
2. Recipe Class
*/

/* ----- 1. Imports ----- */
/* a. Firebase Imports */
import {
    collection,
    DocumentReference,
    getDoc,
    Timestamp,
} from "firebase/firestore";
import { db } from "../Firebase/init";

/* b. Object Parents */
import { DMObject } from "../Topology/Abstracts";

/* c. Type Imports */
import { DataJSON } from "../Topology/types";
import User from "../User/User";
import Directions from "./Directions";
import Ingredient from "./Ingredient";
import Review from "./Review";
import { RecipeGlobalData } from "./types";

/* d. Necessary Classes */

export default class Recipe extends DMObject {
    /**
     * @description Recipe class for recipe management.
     * @param dataJSON DataJSON object to initialize Recipe class with.
     * @param docRef DocumentReference to bind Recipe class to.
     */
    constructor(dataJSON: DataJSON, docRef?: DocumentReference | null) {
        super(dataJSON, docRef);
    }
}

export class RecipeUser extends Recipe {
    private name: string;
    private lastDate: Date;
    private rating?: number;
    private familyRating?: number;
    private recipeGlobalReference: DocumentReference;
    private recipeGlobal?: RecipeGlobal;

    /**
     * @description User implememntation of Recipe class.
     * @param dataJSON DataJSON object to initialize Recipe class with.
     * @param docRef DocumentReference to bind Recipe class to.
     */
    constructor(dataJSON: DataJSON, docRef?: DocumentReference | null) {
        super(dataJSON, docRef);

        this.name = dataJSON.name;
        this.lastDate = dataJSON.lastDate.toDate();
        this.rating = dataJSON.rating;
        this.familyRating = dataJSON.familyRating;
        this.recipeGlobalReference = dataJSON.recipeGlobalReference;
        this.recipeGlobal = dataJSON.recipeGlobal;
    }

    public getName(): string {
        return this.name;
    }

    public getLastDate(): Date {
        return this.lastDate;
    }
}

/**
 * @description Generates a new RecipeUser object (required for GlobalRecipe access)
 * @param dataJSON DataJSON object to initialize Recipe class with.
 * @param docRef DocumentReference to bind Recipe class to.
 * @returns RecipeUser object.
 */
export async function generateRecipeUser(
    dataJSON: DataJSON,
    docRef?: DocumentReference | null
): Promise<RecipeUser> {
    let recipeGlobalReference = dataJSON.recipeGlobalReference;
    if (recipeGlobalReference) {
        dataJSON.recipeGlobal = await getDoc(recipeGlobalReference);
    }
    return new RecipeUser(dataJSON, docRef);
}

export class RecipeGlobal extends Recipe {
    private attachments: string[];
    private author?: string;
    private category: string;
    private prepTime?: number;
    private cookTime?: number;
    private serves?: number;
    private creatorReference: DocumentReference;
    private creator?: User;
    private description: string;
    private directions: Directions;
    private ingredients: Ingredient[];
    private name: string;
    private reviews: Review[];
    private tags: string[];
    private thumbnailPath?: string;
    private sourceUrls: string[];
    private private: boolean;

    /**
     * @description Global implememntation of Recipe class.
     * @param dataJSON DataJSON object to initialize Recipe class with.
     * @param docRef DocumentReference to bind Recipe class to.
     */
    constructor(dataJSON: RecipeGlobalData, docRef?: DocumentReference | null) {
        super(dataJSON, docRef);

        this.attachments = dataJSON.attachments;
        this.author = dataJSON.author;
        this.category = dataJSON.category;
        this.prepTime = dataJSON.prepTime;
        this.cookTime = dataJSON.cookTime;
        this.serves = dataJSON.serves;
        this.creatorReference = dataJSON.creatorReference;
        this.creator = dataJSON.creator;
        this.description = dataJSON.description;
        this.directions = dataJSON.directions;
        this.ingredients = dataJSON.ingredients;
        this.name = dataJSON.name;
        this.reviews = dataJSON.reviews;
        this.tags = dataJSON.tags;
        this.thumbnailPath = dataJSON.thumbnailPath;
        this.sourceUrls = dataJSON.sourceUrls;
        this.private = dataJSON.private;
    }
}

export async function RecipeGlobalFromReference(
    globalReference: DocumentReference
): Promise<RecipeGlobal> {
    let refDoc = await getDoc(globalReference);
    let refData = <RecipeGlobalData>refDoc.data();

    let refObj = new RecipeGlobal(refData, globalReference);
    return refObj;
}

export namespace RecipeUtils {
    export var recipes = collection(db, "recipes");
}
