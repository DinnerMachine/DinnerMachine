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
    getDocs,
    FirestoreDataConverter,
    DocumentSnapshot,
    SnapshotOptions,
} from 'firebase/firestore';
import { DMObject } from '@api/topology/Abstracts';
import {
    RecipeGlobalDataReference,
    RecipesDataReference,
    RecipeUserDataReference,
} from '@api/recipe/types';
import { db } from '@api/Firebase/init';
import Category, {
    CategoryConverter,
} from '@api/Organization/Category/Category';
import { CategoryDoesNotExistError } from '@api/organization/errors';
import User, { UserConverter } from '@api/user/User';
import { StorageReference } from 'firebase/storage';
import { UserDoesNotExistError } from '@api/User/errors';
import { AttachmentsDataReference } from './Attachment/types';
import { TagsDataReference } from '@api/Organization/Tags/types';
import { SourcesDataReference } from './Source/types';
import { NotesDataReference } from './Note/types';
import { Ingredients } from './Ingredient/Ingredient';
import Directions from './Direction/Directions';
import { Tags } from '@api/Organization/Tags/Tag';
import { Sources } from './Source/Source';
import { Reviews } from './Review/Review';

export class Recipes extends DMObject<RecipesDataReference> {
    private recipes: DocumentReference[];

    constructor(data: RecipesDataReference, docRef?: DocumentReference) {
        super(data, docRef);
        this.recipes = data.recipes || [];
    }

    public async getRecipes(): Promise<RecipeUser[]> {
        var recipes: RecipeUser[] = [];
        for (var docRef of this.recipes) {
            var doc = await getDoc(docRef);
            if (doc.exists()) recipes.push(new RecipeUser(doc.data(), docRef));
        }
        return recipes;
    }
}

// Things are stored as collections here but as documents in the storage object
// that way it prevents retrieving all the data, but when we have a master object
// we can assume we have all the necessary data from it.

export class RecipeGlobal extends DMObject<RecipeGlobalDataReference> {
    private attachments: AttachmentsDataReference; // ==> Attachments
    private author?: string;
    private category?: DocumentReference; // ==> Category
    private prepTime?: number;
    private cookTime?: number;
    private serves?: number;
    private creator?: DocumentReference; // ==> User
    private description?: string;
    private _directions?: CollectionReference; // ==> Directions
    private ingredients?: CollectionReference; // ==> Ingredients
    private name?: string;
    private reviews?: CollectionReference; // ==> Reviews
    private tags?: TagsDataReference; // ==> Tags
    private thumbnail?: StorageReference;
    private sources: SourcesDataReference; // ==> Sources
    private private?: boolean;

    constructor(data: RecipeGlobalDataReference, docRef?: DocumentReference) {
        super(data, docRef);
        this.attachments = data.attachments || [];
        this.author = data.author;
        this.category = data.category;
        this.prepTime = data.prepTime;
        this.cookTime = data.cookTime;
        this.serves = data.serves;
        this.creator = data.creator;
        this.description = data.description;
        this._directions = data.directions;
        this.ingredients = data.ingredients;
        this.name = data.name;
        this.reviews = data.reviews;
        this.tags = data.tags;
        this.thumbnail = data.thumbnail;
        this.sources = data.sources || [];
        this.private = data.private;
    }

    async getCategory(): Promise<CategoryDoesNotExistError | Category | null> {
        if (!this.category) return null;
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

    public setDirections(directions: Directions | CollectionReference) {
        if (directions instanceof Directions)
            this._directions = directions.collectionRef;
        this._directions = directions as CollectionReference;
    }

    public set directions(directions: CollectionReference | Directions) {
        if (directions instanceof Directions)
            this._directions = directions.collectionRef;
        this._directions = directions as CollectionReference;
    }

    async getDirections(): Promise<Directions | null> {
        if (!this._directions) return null;
        return Directions.fromCollection(this._directions);
    }

    async getIngredients(): Promise<Ingredients | null> {
        if (!this.ingredients) return null;
        return new Ingredients(this.ingredients);
    }

    async getReviews(): Promise<Reviews | null> {
        if (!this.reviews) return null;
        return new Reviews(this.reviews);
    }

    async getTags(): Promise<Tags | null> {
        if (!this.tags) return null;
        return new Tags(this.tags);
    }

    async getSources(): Promise<Sources | null> {
        if (!this.sources) return null;
        return new Sources(this.sources);
    }
}

export const RecipeGlobalConverter: FirestoreDataConverter<RecipeGlobal> = {
    toFirestore(recipeGlobal: RecipeGlobal): RecipeGlobalDataReference {
        return recipeGlobal.getData();
    },
    fromFirestore(
        snapshot: DocumentSnapshot,
        options: SnapshotOptions,
    ): RecipeGlobal {
        const data = snapshot.data(options) as RecipeGlobalDataReference;
        return new RecipeGlobal(data, snapshot.ref);
    },
};

export class RecipeUser extends DMObject<RecipeUserDataReference> {
    private name?: string;
    private recipeGlobal?: DocumentReference;
    private rating?: number;
    private notes?: NotesDataReference;
    private tags?: TagsDataReference;

    constructor(data: RecipeUserDataReference, docRef?: DocumentReference) {
        super(data, docRef);
        this.name = data.name;
        this.recipeGlobal = data.recipeGlobal;
        this.rating = data.rating;
        this.notes = data.notes;
        this.tags = data.tags;
    }

    async getRecipeGlobal(): Promise<RecipeGlobal | null> {
        if (!this.recipeGlobal) return null;
        const recipeGlobalRef = this.recipeGlobal.withConverter(
            RecipeGlobalConverter,
        );
        const recipeGlobal = await getDoc(recipeGlobalRef);
        return recipeGlobal.data()!;
    }
}

export const RecipeUserConverter: FirestoreDataConverter<RecipeUser> = {
    toFirestore(recipeUser: RecipeUser): RecipeUserDataReference {
        return recipeUser.getData();
    },
    fromFirestore(
        snapshot: DocumentSnapshot,
        options: SnapshotOptions,
    ): RecipeUser {
        const data = snapshot.data(options) as RecipeUserDataReference;
        return new RecipeUser(data, snapshot.ref);
    },
};

export namespace RecipeUtils {
    export var recipes = collection(db, 'recipes');
    export var categories = collection(db, 'categories');
}
