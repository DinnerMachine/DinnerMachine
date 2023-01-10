/*
~ ~ ~ DinnerMachine - Recipe Manager & Generator ~ ~ ~
- Recipe/Recipe -

@file: api/Recipe/Recipe.ts
@author: Dallin Guisti
@description: Recipe class for recipe management.
@version: 1.0.0
@created 8/21/2022
@updated 1/2/2023

Copyright (c) 2023 Dallin Guisti. All rights reserved.
*/

import {
    doc,
    DocumentReference,
    collection,
    getDoc,
    CollectionReference,
} from 'firebase/firestore';
import { DMObject } from '@api/topology/Abstracts';
import { RecipeGlobalDataReference } from '@api/recipe/types';
import { db } from '@api/Firebase/init';
import Category, { CategoryConverter } from '@api/organization/Category';
import { CategoryDoesNotExistError } from '@api/organization/errors';
import User, { UserConverter } from '@api/user/User';
import { StorageReference } from 'firebase/storage';
import { UserDoesNotExistError } from '@api/User/errors';

export default class RecipeGlobal extends DMObject<RecipeGlobalDataReference> {
    private attachments: StorageReference[]; // ==> Attachments
    private author?: string;
    private category: DocumentReference; // ==> Category
    private prepTime?: number;
    private cookTime?: number;
    private serves?: number;
    private creator?: DocumentReference; // ==> User
    private description?: string;
    private directions: CollectionReference; // ==> Directions
    private ingredients: CollectionReference; // ==> Ingredients
    private name: string;
    private reviews: CollectionReference; // ==> Reviews
    private tags: DocumentReference[]; // ==> Tags
    private thumbnail?: StorageReference;
    private sources: DocumentReference[]; // ==> Sources
    private private: boolean;
    private type: 'RecipeGlobal' = 'RecipeGlobal';

    constructor(
        data: RecipeGlobalDataReference,
        docRef?: DocumentReference | null,
    ) {
        super(data, docRef);
        this.attachments = data.attachments;
        this.author = data.author;
        this.category = data.category;
        this.prepTime = data.prepTime;
        this.cookTime = data.cookTime;
        this.serves = data.serves;
        this.creator = data.creator;
        this.description = data.description;
        this.directions = data.directions;
        this.ingredients = data.ingredients;
        this.name = data.name;
        this.reviews = data.reviews;
        this.tags = data.tags;
        this.thumbnail = data.thumbnail;
        this.sources = data.sources;
        this.private = data.private;
    }

    async getCategory(): Promise<CategoryDoesNotExistError | Category> {
        const categoryRef = this.category.withConverter(CategoryConverter);
        const category = await getDoc(categoryRef);
        if (!category.exists())
            return new CategoryDoesNotExistError(
                'The requested category does not exist.',
            );
        else return category.data();
    }

    async getCreator(): Promise<UserDoesNotExistError | User | null> {
        if (!this.creator) return null;
        const creatorRef = this.creator.withConverter(UserConverter);
        const creator = await getDoc(creatorRef);
        if (!creator.exists())
            return new UserDoesNotExistError(
                'The requested creator does not exist.',
            );
        else return creator.data();
    }

    async getDirections(): Promise<Directions> {
        return new Directions(this.directions);
    }

    async getIngredients(): Promise<Ingredients> {
        return new Ingredients(this.ingredients);
    }

    async getReviews(): Promise<Reviews> {
        return new Reviews(this.reviews);
    }

    async getTags(): Promise<Tags> {
        return new Tags(this.tags);
    }

    async getSources(): Promise<Sources> {
        return new Sources(this.sources);
    }
}

export namespace RecipeUtils {
    export var recipes = collection(db, 'recipes');
    export var categories = collection(db, 'categories');
}
