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

export class Recipes extends DMObject<RecipesDataReference> {
    private recipes: CollectionReference;
    private type: 'Recipes' = 'Recipes';

    constructor(data: RecipesDataReference, docRef?: DocumentReference | null) {
        super(data, docRef);
        this.recipes = data.recipes;
    }

    public async getRecipes(): Promise<RecipeUser[]> {
        const recipes: RecipeUser[] = [];
        const snapshot = await getDocs(this.recipes);
        snapshot.forEach((doc) => {
            recipes.push(doc.data() as RecipeUser);
        });
        return recipes;
    }
}

export class RecipeGlobal extends DMObject<RecipeGlobalDataReference> {
    private attachments: AttachmentsDataReference; // ==> Attachments
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
    private tags: TagsDataReference; // ==> Tags
    private thumbnail?: StorageReference;
    private sources: SourcesDataReference; // ==> Sources
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
    private name: string;
    private recipeGlobal: DocumentReference;
    private rating: number;
    private notes: NotesDataReference;
    private tags: TagsDataReference;
    private type: 'RecipeUser' = 'RecipeUser';

    constructor(
        data: RecipeUserDataReference,
        docRef?: DocumentReference | null,
    ) {
        super(data, docRef);
        this.name = data.name;
        this.recipeGlobal = data.recipeGlobal;
        this.rating = data.rating;
        this.notes = data.notes;
        this.tags = data.tags;
    }

    async getRecipeGlobal(): Promise<RecipeGlobal> {
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
